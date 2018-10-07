import Document, { Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link href="https://cdn.bootcss.com/normalize/8.0.0/normalize.min.css" rel="stylesheet" />
          <link href="https://cdn.bootcss.com/antd/3.5.4/antd.min.css" rel="stylesheet" />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <script src="https://unpkg.com/wangeditor@3.1.1/release/wangEditor.min.js"></script>
          <NextScript />
        </body>
      </html>
    )
  }
}