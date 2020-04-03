import escapeStringRegexp from "escape-string-regexp";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Helmet } from "react-helmet";
import App from "../../App";
import { StaticRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import serialize from "serialize-javascript";
const renderMiddleware = () => (req, res) => {
  let html = req.html;
  // reacte router
  const routerContext = {};
  const store = req.store;
  const htmlContent = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
      <StaticRouter location={req.url} context={routerContext}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  );
  const helmet = Helmet.renderStatic();
  const htmlReplacements = {
    HTML_CONTENT: htmlContent,
    PRELOADED_STATE: serialize(store.getState(), { isJSON: true }),
    HELMET_HTML_ATTRIBUTES: helmet.htmlAttributes.toString(),
    HELMET_META_ATTRIBUTES: `
           ${helmet.title.toString()}
           ${helmet.meta.toString()}
           ${helmet.link.toString()}
         `,
    HELMET_BODY_ATTRIBUTES: helmet.bodyAttributes.toString()
  };

  Object.keys(htmlReplacements).forEach(key => {
    const value = htmlReplacements[key];
    html = html.replace(
      new RegExp("__" + escapeStringRegexp(key) + "__", "g"),
      value
    );
  });

  if (routerContext.url) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.redirect(302, routerContext.url);
  } else {
    res.send(html);
  }
  // res.send(html);
};

export default renderMiddleware;
