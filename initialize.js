//Initialize cloud firestore through firestore

var db=firebase.firestore();

var studentRef=db.collection("Student");

studentRef.get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
        console.log(`${doc.id}`);
    })
})

studentRef.doc("G.Solomon").set({
   fName:"Glenn",
    mName:"",
    lName:"Solomon",
address:"Wodroffe,Ottawa",
    email:"asdf123e@gmail.com",
    age:23,
    gender:'Male',
    course:"Data mining and analysis",
    isFullTime:true,
});
studentRef.doc("J.Virani").set({
   fName:"Jenice",
mName:"Rameshbhai",
    lName:"Virani",
address:"Fisher road,Ottawa",
    email:"vira0016@algonquinlive.com",
    age:26,
    gender:'Male',
   course:"Mobile application design and development",
    isFullTime:false,
});
studentRef.doc("R.Pandey").set({
   fName:"Raunak",
mName:"Ronnie",
    lName:"Pandey",
address:"Highgate,Ottawa",
    email:"Ronpen190@gmail.com",
    age:28,
    gender:'Male',
    course:"Sports Business management",
    isFullTime:true,
});

studentRef.doc("J.Jeffery").set({
   fName:"Johnathan",
mName:"John",
    lName:"Jeffery",
address:"Metclife,ottawa",
    email:"JohnJ456Je@gmail.com",
    age:37,
    gender:'Male',
    course:"Electrical Enginnering",
    isFullTime:true,
});

studentRef.doc("K.Gregory").set({
   fName:"Kemi",
mName:"Kevin",
    lName:"Gregory",
address:"Orleans,Ottawa",
    email:"KKGregory123e@gmail.com",
    age:26,
    gender:'Female',
    course:"Sports Business Management",
    isFullTime:false,
});