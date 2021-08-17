
window.onload = generate();

document.querySelector(".generate").addEventListener("click", ()=>generate());
document.querySelector(".clear").addEventListener("click", ()=>clear());

function generate()
{
    const initPerson = personGenerator.getPerson();
    document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    document.getElementById('surnameOutput').innerText = initPerson.surName;
    document.getElementById('genderOutput').innerText = initPerson.gender;
    document.getElementById('birthYearOutput').innerText = initPerson.birthDate;
    document.getElementById('professionOutput').innerText = initPerson.profession;
    document.getElementById('patronymicOutput').innerText = initPerson.patronymic;

}

function clear()
{
    document.getElementById('firstNameOutput').innerText = "-";
    document.getElementById('surnameOutput').innerText = "-";
    document.getElementById('genderOutput').innerText = "-";
    document.getElementById('birthYearOutput').innerText = "-";
    document.getElementById('professionOutput').innerText = "-";
    document.getElementById('patronymicOutput').innerText = "-";
}
