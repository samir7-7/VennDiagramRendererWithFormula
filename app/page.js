'use client'

export default function Home() {
  return (
    <main>
      <script defer type="text/javascript" src="/js/main.js"></script>
      <script defer type="text/javascript" src="/js/mcCluskyMethod.js"></script>
      <div id="container">
        <form name="form1">
          <div className="container">
            <div className="content css-content">
              <div className='options'>
                circle number
                <select id='nEvents' onChange={() => updateN() && renderVenn()}>
                  <option id='2' value={2}>2</option>
                  <option id='3' value={3}>3</option>
                </select><br />
                <button type="button" onClick={() => simplifyAndDrawExpression()} value="calculate">Calculate</button>
                <textarea defaultValue={`(A'u(BnC'))'`} id="inputExpression"></textarea>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='content'>
              <canvas id="venn" width="500" height="500">
              </canvas>
              {/* <script>
              // mouse positioning not currently working in react/nextjs environment
                document.getElementById("venn").addEventListener("mousedown", function (e) {
                  getMousePosition(document.getElementById("venn"), e)
                });
              </script> */}
            </div>
          </div>
          <div className="container">
            <input type="checkbox" onChange={() => null} checked={true} id="headerOutput" className="css-checkbox" />
            <label htmlFor="headerOutput" className="css-label">Output</label>
            <div className="content css-content">
              <div className='results' id='displaySetNotation'></div>
            </div>
          </div>

        </form>
      </div>
    </main>
  )
}
