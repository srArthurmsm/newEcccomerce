const cad = document.getElementById('cad')
const Login = document.getElementById('Login')
const token = localStorage.getItem('token')

const payload = JSON.parse(atob(token.split('.')[1]));

cad.addEventListener('click',(e)=>{
    window.location.href = "./cadastrar.html"
})

Login.addEventListener('click',(e)=>{
    window.location.href = "./Login.html"
})



function mandarPagina(id){
    window.location.href = `./jogo.html?id=${id}`
}



const tabela = document.getElementById('tabela')


function listar(){
    tabela.innerHTML = ""
    dados = JSON.parse(localStorage.getItem('produtos'))
    precoTotal = 0
    dados.forEach(produto => {
        const linha = document.createElement('tr')
        const colunas = ["nome","precoCompra"]

        colunas.forEach(campo => {
            linha.innerHTML += `<td>${produto[campo]}</td>`
            if (campo == "precoCompra"){
                precoTotal += produto[campo]
            }
        })
        tabela.appendChild(linha)
    })
    const linha = document.createElement('tr')
    linha.innerHTML = `<td>Preço Total</td> <td>${precoTotal}</td>`
    tabela.appendChild(linha)
}

const Limpar = document.getElementById('Limpar')
const Comprar = document.getElementById('Comprar')


Limpar.addEventListener('click',(e)=>{
    localStorage.removeItem('produtos')
})

Comprar.addEventListener('click', (e)=>{
    const produtos = JSON.parse(localStorage.getItem('produtos'))
    const body = {
        idCliente: payload.codCliente, 
        compras: produtos.map(p => ({
            idJogo: p.id,          
            preco: p.precoCompra
        }))
    };


    fetch('http://localhost:3000/compra/carrinho',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    })
    .then((dados)=>{
        console.log(dados)
    })
    .catch((err)=>{
        console.log(err)
    })
})

window.onload = listar
