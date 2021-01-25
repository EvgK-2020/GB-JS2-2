let textToReplace = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
    One: 'Not too bad. The weather is great isn't it?'
    Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
    Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'`;

const regexp = /(?<!\w)(')/g;
textToReplace = textToReplace.replace(regexp, '"');

document.getElementById("text").innerHTML = textToReplace;


class ItemForm {
    constructor(item) {
        let { title, name, placeholder = ""} = item;
        this.title = title;
        this.name = name;
        this.placeholder = placeholder;
    }

    checkVal(val){
        cinsole.log(this);

    }
}

class TextForm extends ItemForm {
    render() {
        return `<div class="form-item">
            <label for="${this.name}">${this.title}</label>
            <input type="text" id="${this.name}" name="${this.name}" placeholder="${this.placeholder}">
  </div>`;
    }
}

class TextareaForm extends ItemForm {
    render() {
        return `        <div class="form-item">
        <label for="${this.name}">${this.title}</label>
        <textarea name="${this.name}" id="${this.name}" cols="30" rows="10"></textarea>
</div>`;
    }
}

class SubmitForm extends ItemForm {
    render() {
        return `        <div class="form-item">
        <input type="submit" class="submit-button" value="${this.title}">
</div>`;
    }
}



class Form {
    constructor(container = '#task3', action = '#') {
        this.data = [];
        this.container = document.querySelector(container);
        this.action = action;
        this._fetchData();
        this._render();
        this.init();
    }

    init() {
        document.querySelector('.submit-button').addEventListener('click', e => {
             e.preventDefault();
             this._checkingForm();
        });
        }

_checkingForm(){
    for (let dataEl of this.data) {
        let element = document.getElementById(dataEl.name);
        if (Object.values(dataEl.type).join('') != "submit")
        {
            if (new RegExp(dataEl.regexp).test(element.value)){
                console.log("1");
                element.classList.remove("error");
            }
            else{
                console.log(dataEl.regexp);
                console.log(element.value);
                console.log("0");
                element.focus();
                element.classList.add("error");
                alert(dataEl.ifError);

            }
        }
    }   
}

    _render() {
        let formContent = "";
        for (let dataEl of this.data) {
            let item;
            switch(Object.values(dataEl.type).join('')){
                case "text":
                     item = new TextForm(dataEl);
                   break; 
                case "textarea":
                     item = new TextareaForm(dataEl);
                   break; 
                case "submit":
                    item = new SubmitForm(dataEl);
                  break;                    
            }
            formContent += item.render();
        }
        this.container.insertAdjacentHTML('beforeend', `<form action="${this.action}">${formContent}</form>`);
    }

    _fetchData() {
        this.data = [
            { title: 'ФИО', name: "name", placeholder: "", type:"text", regexp: "^[a-zA-Zа-яА-ЯЁё]+$", ifError: "Имя должно содержать только буквы!" },
            { title: 'Телефон', name: "phone", placeholder: "", type:"text", regexp: "^[\+][7]\(\d{3}\)\d{3}[-]\d{4}$", ifError: "Нужный формат телефоного номера: +7(000)000-0000" },
            { title: 'Почта', name: "email", placeholder: "", type:"text", regexp: "^[a-z.-]+[@][a-z]+[.](ru|com)$", ifError: "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru" },
            { title: 'Сообщение', name: "message", placeholder: "", type:"textarea", regexp: "", ifError: ""  },
            { title: 'Отправить', name: "send", placeholder: "", type:"submit", regexp: "", ifError: ""  }
        ];
    }
}

const qwe=new Form();