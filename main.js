const textarea = document.getElementById("text");
const convert = document.getElementById("convert");
const textareaJsonInsert = document.getElementById("json");

convert.addEventListener("click", (event) => {
  event.preventDefault();

  const regExpSplit = /\n/; // esse "n" significa quebra de linha
  const columns = textarea.value.trim().split(regExpSplit);
  const jsonColunmsName = columns[0].split(",");
  const dataJsonColunms = columns.splice(1); // Remove colunas de nomes pra por nos jsons

  if (textarea.value.length == 0) {
    alert("por favor insira o csv");
  }

  try {
    const dataJsonFormated = dataJsonColunms.map((iten) => {
      const itensSplit = iten.split(",");
      const numberItens = itensSplit.length;
      const object = {};

      for (let number = numberItens - 1; number >= 0; number -= 1) {
        if (itensSplit[number] != "") {
          object[jsonColunmsName[number].trim()] = itensSplit[number];
        } else {
          return undefined;
        }
      }
      return JSON.stringify(object);
    });

    textareaJsonInsert.innerText = `[${dataJsonFormated.filter((item) => {
      return item != undefined;
    })}]`;
  } catch (error) {
    alert("insira um csv valido");
    console.log(error);
  }
});
