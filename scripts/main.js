function insertMail() {
    const email = {
        'email': document.querySelector('#email').value
    } 
    axios
        .post('http://localhost:3000/insert', email)
        .then((response) => {
            console.log(response.email)
            alert('Seu e-mail foi cadastrado com sucesso!')
        })
        .catch((error) => {
            console.log(error)
            alert('O e-mail é obrigatório!')
        })
}