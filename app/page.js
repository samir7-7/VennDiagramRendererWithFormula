"use client";

export default function Home() {
  return (
    <main>
      <script defer type="text/javascript" src="/js/main.js"></script>
      <script defer type="text/javascript" src="/js/mcCluskyMethod.js"></script>
      <div id="container">
        <form name="form1">
          <div className="w-[100vw] flex justify-center mb-2">
            <div className="content css-content w-[80%]  flex justify-center">
              <div
                className="options flex flex-col
              gap-3 w-[50%] items-center"
              >
                <div className="select flex gap-2 w-[150%] justify-center">
                  <span className="font-semibold">circle number</span>
                  <select
                    className="w-15"
                    id="nEvents"
                    onChange={() => updateN() && renderVenn()}
                  >
                    <option id="2" value={2}>
                      2
                    </option>
                    <option id="3" value={3}>
                      3
                    </option>
                  </select>
                </div>

                <textarea
                  placeholder="Enter your formula"
                  defaultValue={`(A'u(BnC'))'`}
                  id="inputExpression"
                  className="border-[1px] border-black border-dotted w-[150%] p-3 md:w-[50%]"
                ></textarea>
                <button
                  type="button"
                  onClick={() => simplifyAndDrawExpression()}
                  value="calculate"
                  className="bg-blue-500 p-4 py-2 text-white rounded-lg"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-[100vw] justify-center">
            <div className="content">
              <canvas id="venn" width="400" height="400"></canvas>
              {/* <script>
              // mouse positioning not currently working in react/nextjs environment
                document.getElementById("venn").addEventListener("mousedown", function (e) {
                  getMousePosition(document.getElementById("venn"), e)
                });
              </script> */}
            </div>
          </div>
          <div className="container">
            <input
              type="checkbox"
              onChange={() => null}
              checked={true}
              id="headerOutput"
              className="css-checkbox"
            />
            <label htmlFor="headerOutput" className="css-label">
              Output
            </label>
            <div className="content css-content">
              <div
                className="results text-black bg-yellow-300"
                id="displaySetNotation"
              ></div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
