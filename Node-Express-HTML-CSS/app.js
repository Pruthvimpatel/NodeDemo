const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const renderPage = (res,page) => {
    res.sendFile(path.join(__dirname,'views',page));
};

app.get('/',(req,res) => {
    renderPage(res,'home.html');
});

app.get('/about',(req,res) => {
    renderPage(res,'about.html');
});


app.use((req,res)=> {
    renderPage(res,'notfound.html');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`server listening on ${PORT}`);
})

