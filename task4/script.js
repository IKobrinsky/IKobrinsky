  document.getElementById("changedRef").addEventListener('click', function()
  {
    let newRefText = prompt("ВВедите новый текст ссылки");
    if (newRefText.length>0)
    {
      this.textContent=newRefText;
    }
    preventDefault();
  }
  )