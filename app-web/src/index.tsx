import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

if (navigator.serviceWorker != null) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log(
        "ServiceWorker registration successful with scope: ",
        registration.scope
      );
    })
    .catch(function (err) {
      console.log("ServiceWorker registration failed: ", err);
    });
  navigator.serviceWorker.ready.then(function (registration) {});
} else {
  //serviceWorker is not supported
}

//监听添加到主屏幕事件
window.addEventListener("beforeinstallprompt", function (event: any) {
  // //取消添加
  // e.preventDefault();
  // return false;

  event.userChoice.then(function (result: any) {
    console.log(result.outcome);
    if (result.outcome === "dismissed") {
    } else {
    }
  });
});
