/* eslint-disable no-undef */
import React, { useEffect } from "react";

const Demo = () => {


  useEffect(() => {
      const loadScript = async (path) => {
        const script = document.createElement("script");
        script.src = path;
        // script.src = "./static/epos-2.14.0.js";
        // script.src = "./static/sampleEJ.js";
        script.async = true;
        script.onload = () => scriptLoaded();
    
        document.body.appendChild(script);    
      }

      loadScript("./static/epos-2.14.0.js");
    //   loadScript("./static/sampleEJ.js");
  }, []);

  const scriptLoaded = () => {
    // console.log("script loaded");
    // eslint-disable-next-line no-undef
    // log_text("some text");
    var printer = null;
    var ePosDev = new epson.ePOSDevice();
    print_text();

    function print_text() {
      ePosDev.connect("192.168.10.41", 8008, cbConnect);
    }

    function cbConnect(data) {
      if (data === "OK") {
        console.log("device connect success");
        ePosDev.createDevice(
          "local_printer",
          ePosDev.DEVICE_TYPE_PRINTER,
          { crypto: false, buffer: false },
          cbCreateDevice_printer
        );
      } else {
        console.log("Device connect error : ");
        console.log(data);
        // alert(data);
      }
    }

    function cbCreateDevice_printer(devobj, retcode) {
      if (retcode === "OK") {
        console.log("printer connect success");
        printer = devobj;
        executeAddedCode(printer);
      } else {
        console.log("printer connect error : ");
        console.log(retcode);
        // alert(retcode);
      }
    }

    function executeAddedCode(p) {
      var text_input = "sample text print - react";

    //   p.addText(text_input);
    //   p.send();
    }


  };

  return <div>demo component for print</div>;
};

export default Demo;
