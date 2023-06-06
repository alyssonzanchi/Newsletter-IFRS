function registerMail() {
    const email = {
        'email': document.querySelector('#email').value
    } 
    axios
        .post('http://localhost:3000/register', email)
        .then((response) => {
            console.log(response.email)
            alert('Seu email foi cadastrado com sucesso!')
        })
        .catch((error) => {
            console.log(error)
        })
}