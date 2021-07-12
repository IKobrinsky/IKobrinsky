  document.getElementById("submitButton").addEventListener('click', function()
  {
    document.getElementById("inputField").value = "";
    document.getElementById("duplicateField").textContent =""; 
  }
  )

  document.getElementById("inputField").addEventListener('keyup', function()
  {
    document.getElementById("duplicateField").textContent =this.value; 
  }
  )