const formCadastro = document.getElementById('formCadastro')
const res = document.getElementById('res')


const token = localStorage.getItem('token')

formCadastro.addEventListener('submit', (e) => {
    e.preventDefault()
    
      const form = e.target
      const formData = new FormData(form)
  
      for (let [key, value] of formData.entries()) {
        console.log(key, value)
      }
      fetch('http://localhost:3000/jogo', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token
        },
        body: formData
      })
      .then(resp => resp.json())
      .then((dados)=>{
        res.innerHTML = dados.message
      })
      .catch((dados)=>{
        console.error(dados)
        res.innerHTML = 'Erro ao cadastrar o usuário.'
      })
  })