export async function onRequest(context) {
  const { request } = context;

  // 解析请求 URL
  const url = new URL(request.url);

  // 获取允许跨域访问的 Origin
  const headers_Origin =
    request.headers.get("Access-Control-Allow-Origin") || "*";
  // 创建一个包含多个 user-agent 的数组
  const userAgents = [
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) FxQuantum/120.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (Macintosh; Apple M3 Mac OS X 14_1) AppleWebKit/614.1.25 (KHTML, like Gecko) Chrome/123.0.6197.0 Safari/610.1",
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; U; Android 9; zh-CN; MI 9 Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/84.0.3765.82 UCBrowser/12.5.5.1035 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 7.1.1; OPPO R9sk) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.2654.65 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 7.1.1; OPPO R9sk) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.4068.94 Mobile Safari/537.36 EdgA/42.0.2.3819",
    "Mozilla/5.0 (Linux; Android 11; TECNO CE9 Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.164 Mobile Safari/537.36 Vinebre",
    "Mozilla/5.0 (Linux; Android 7.1.1; OPPO R9sk Build/NMF26F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3448.120 Mobile Safari/537.36 360 Alitephone Browser (1.5.0.90/1.0.100.1078) mso_sdk(1.0.0)",
    "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G318B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111",
  ];

  // 从数组中随机选择一个 user-agent
  const randomUserAgent =
    userAgents[Math.floor(Math.random() * userAgents.length)];

  // 复制原始请求的 headers，并添加自定义 headers，包括 user-agent
  const myHeaders = new Headers({
    ...request.headers,
    Referer: "https://ipinfo.io/",
    Origin: "https://ipinfo.io/",
    "User-Agent": randomUserAgent,
  });

  const path = url.pathname;
  let getip =
    path === "/api" || path === "/api/"
      ? [
          "CF-Connecting-IP",
          "X-Forwarded-For",
          "X-Real-IP",
          "X-Client-IP",
          "X-Cluster-Client-IP",
          "X-Forwarded",
          "Forwarded-For",
          "Forwarded",
        ]
          .map((header) => request.headers.get(header))
          .find((ip) => ip)
      : path.replace("/api/", "");
  let queryString = "";
  if (!isNaN(getip)) {
    // 如果输入是数字，则进行 ASN 查询
    queryString = `AS${getip}`;
  } else if (getip.toUpperCase().startsWith("AS")) {
    queryString = getip;
  } else {
    // 否则进行 IP 地址查询
    queryString = getip;
  }
  // 构建修改后的请求对象
  const modifiedRequest = new Request(
    `https://ipinfo.io/widget/demo/${queryString}`,
    {
      method: request.method,
      headers: myHeaders,
      body: request.body,
    }
  );

  // 发起修改后的请求并等待响应
  const response = await fetch(modifiedRequest);

  // 复制响应内容及其 headers 到新的响应对象
  const modifiedResponse = new Response(response.body, response);

  // 设置允许跨域访问的 Origin
  modifiedResponse.headers.set("Access-Control-Allow-Origin", headers_Origin);

  // 删除一些不需要的响应 headers
  const headersToDelete = [
    "x-proxied-host",
    "x-proxied-path",
    "x-proxied-id",
    "proxy-domain",
    "Link",
    "via",
  ];
  headersToDelete.forEach((header) => modifiedResponse.headers.delete(header));

  return modifiedResponse; // 返回修改后的响应
}
