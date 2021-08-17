const personGenerator = {
    surnameJson: `{  
        "count": 15,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    patronymicJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александро",
            "id_2": "Максимо",
            "id_3": "Ивано",
            "id_4": "Артемо",
            "id_5": "Дмитрие",
            "id_6": "Никито",
            "id_7": "Михаило",
            "id_8": "Даниило",
            "id_9": "Егоро",
            "id_10": "Андрее"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Мария",
            "id_3": "Анна",
            "id_4": "Алла",
            "id_5": "Дарья",
            "id_6": "Наталья",
            "id_7": "Марина",
            "id_8": "Елизавета",
            "id_9": "Елена",
            "id_10": "Анастасия"
        }
    }`,
    professionMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Шахтер",
            "id_2": "Летчик",
            "id_3": "Токарь",
            "id_4": "Слесарь",
            "id_5": "Солдат",
            "id_6": "Министр",
            "id_7": "Предприниматель",
            "id_8": "Продавец",
            "id_9": "Грузчик",
            "id_10": "Программист"
        }
    }`,
    professionFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Учитель",
            "id_2": "Врач",
            "id_3": "Кассир",
            "id_4": "Парикмахер",
            "id_5": "Юрист",
            "id_6": "Министр",
            "id_7": "Предприниматель",
            "id_8": "Продавец",
            "id_9": "Бухгалтер",
            "id_10": "Программист"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomFirstName: function(gender) {

        return gender == this.GENDER_FEMALE ?
            this.randomValue(this.firstNameFemaleJson) :
            this.randomValue(this.firstNameMaleJson);

    },

    randomSurName: function(gender) {
        return this.randomValue(this.surnameJson) + (gender == this.GENDER_FEMALE ? "а" : "");
    },

    randomProfession : function(gender) {
        return gender == this.GENDER_FEMALE ?
            this.randomValue(this.professionFemaleJson) :
            this.randomValue(this.professionMaleJson);

    },
    randomPatronymic: function (gender)
    {
        return this.randomValue(this.patronymicJson) + (gender == this.GENDER_FEMALE ? "вна" : "вич");
    },

     randomSurname: function() {

        return this.randomValue(this.surnameJson);

    },

    randomGender : function(){
        return this.randomIntNumber() == 1 ? this.GENDER_MALE : this.GENDER_FEMALE;
    },

    monthNames : ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],

    randomBirthDate : function() {
        let d = new Date(1950, 1, 1);
        d.setDate(d.getDate() + this.randomIntNumber(18627, 0)); // max = 2000/12/31 - 1950/01/01
        return d.getDate().toString() + " " + this.monthNames[d.getMonth()] + " " + d.getFullYear().toString();
    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender);
        this.person.surName = this.randomSurName(this.person.gender);
        this.person.patronymic = this.randomPatronymic(this.person.gender);
        this.person.birthDate =  this.randomBirthDate();
        this.person.profession = this.randomProfession(this.person.gender);
        return this.person;
    }
};
