function rungeKutta(f, x0, y0, xEnd, h) {
  const results = [];
  let x = x0;
  let y = y0;

  while (x <= xEnd) {
    results.push([x, y]);

    const k1 = h * f(x, y);
    const k2 = h * f(x + h / 2, y + k1 / 2);
    const k3 = h * f(x + h / 2, y + k2 / 2);
    const k4 = h * f(x + h, y + k3);

    y += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    x += h;
  }

  return results;
}

function calculateRungeKutta() {
  const x0 = parseFloat(document.getElementById("x0").value);
  const y0 = parseFloat(document.getElementById("y0").value);
  const xEnd = parseFloat(document.getElementById("xEnd").value);
  const h = parseFloat(document.getElementById("h").value);
  const func = document.getElementById("func").value;

  // Convertimos la función ingresada en texto a una función real, soportando Math
  const f = new Function(
    "x", 
    "y", 
    `with (Math) { return ${func}; }`
  );

  try {
    // Calculamos los resultados con el método de Runge-Kutta
    const results = rungeKutta(f, x0, y0, xEnd, h);

    // Mostramos los resultados en una tabla
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = `
      <h2>Resultados</h2>
      <table>
        <tr>
          <th>x</th>
          <th>y</th>
        </tr>
        ${results
          .map(
            ([x, y]) => `
          <tr>
            <td>${x.toFixed(4)}</td>
            <td>${y.toFixed(4)}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    `;
  } catch (error) {
    alert("Error en la función ingresada. Verifica que esté correctamente escrita.");
  }
}
