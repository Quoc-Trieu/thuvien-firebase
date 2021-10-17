const firebaseConfig = {
    apiKey: "AIzaSyCRZBeL7Ra0bf0Gyng5F_hkfTNqRZWXhi8",
    authDomain: "example-393fc.firebaseapp.com",
    projectId: "example-393fc",
    storageBucket: "example-393fc.appspot.com",
    messagingSenderId: "903845048653",
    appId: "1:903845048653:web:514d462b81e06509860704",
    measurementId: "G-JEH8X54QER"
};

firebase.initializeApp(firebaseConfig)
var db = firebase.firestore();


function deteteUser(docID) {
    db.collection("Users").doc(docID).delete().then(() => {
        getListUsers();
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

function renderUsers(users){
    var list_infor = document.querySelector('.list-items');
    var htmls = users.map((user) => {
        return`
            <li class = "list-item list-item-${user.id}">
            <div class = "colum-form">
            <i>Người dùng:</i>
            <h4>Name: ${user.name}</h4>
            <p>Age: ${user.age}</p>
            </div>
            <div class="colum-btn">
                <button onclick="deteteUser('${user.id}')" class="btn-delete">xoá người dùng</button>
            </div>
            <hr>
            </li>
        `;
    })
    list_infor.innerHTML = htmls.join('');
}

//read data from store 
function getListUsers() {
    db.collection("Users").get().then((querySnapshot) => {
        const users = []
        
        querySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                name: doc.data().Name,
                age: doc.data().Age,
            })
        });
        renderUsers(users)
    });
}

//gửi yêu cầu post(create)
function createUser(data) {
    db.collection("Users").add(data)
    .then((docRef) => {
        getListUsers();
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

//hàm tạo mới 
function handleCreateForm(){
    var btn_create = document.querySelector('.submit');
    
    btn_create.addEventListener('click',()=>{
        var Name = document.querySelector('input[name="name"]').value;
        var Age = document.querySelector('input[name="age"]').value;
        //creat user
        var formData = {
            Name,
            Age
        }
        createUser(formData);
    })
}

getListUsers();
handleCreateForm();