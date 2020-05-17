class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] === undefined || this[i] === '' || this[i] === null){
                return false
            }
        }
        return true
    }
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
    recuperarRegistros(){
        //Array de despesas
        let despesas = Array()
        let id = localStorage.getItem('id')
        
        //recuperar todas as despesas cadastradas em LocalStorage
        for(let i = 1; i <= id; i++){
            // recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            //pular indices pulados/removidos
            if(despesa === null){
                continue
            }
            despesas.push(despesa)
        }
        return despesas
    }
    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarRegistros()

        console.log(despesa)
        console.log(despesasFiltradas)

        if(despesa.ano != ''){
            console.log('Filtro de Ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        if(despesa.mes != ''){
            console.log('Filtro de Mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if(despesa.dia != ''){
            console.log('Filtro de Dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        if(despesa.tipo != ''){
            console.log('Filtro de Tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        if(despesa.descricao != ''){
            console.log('Filtro de Descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor != ''){
            console.log('Filtro de Valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        return despesasFiltradas
    }
}

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    if(despesa.validarDados()){
        bd.gravar(despesa)

        document.getElementById('modalTitulo').innerHTML = 'Registro Inserido com Sucesso'
        document.getElementById('classeModal').className = 'modal-header text-success'
        document.getElementById('modalConteudo').innerHTML = 'Despesa cadastrada com Sucesso'
        document.getElementById('classeModalBtn').className = 'btn btn-success'
        document.getElementById('classeModalBtn').innerHTML = 'Ok'
        $('#modalRegistraDespesa').modal('show')
        limparCampos()
    }else{
        document.getElementById('modalTitulo').innerHTML = 'Erro ao Registrar'
        document.getElementById('classeModal').className = 'modal-header text-danger'
        document.getElementById('modalConteudo').innerHTML = 'Exitem campos obrigatórios que não foram preenchidos'
        document.getElementById('classeModalBtn').className = 'btn btn-danger'
        document.getElementById('classeModalBtn').innerHTML = 'Corrigir'
        $('#modalRegistraDespesa').modal('show')
    }
}

function limparCampos(){
    let campos = document.getElementsByClassName('form-control')
    for (let i in campos){
        campos[i].value = ''
    }
}

function carregaListaDespesas(despesas = Array(), filtro = false){
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarRegistros()
    }
   
   //selecionando o tbody da tabela
   let listaDespesas = document.getElementById('listaDespesas')
   listaDespesas.innerHTML = ''

   //percorrendo o array despesas
   despesas.forEach(function(d){
       //criando o tr
       let linha = listaDespesas.insertRow()

       //ajustar o d.tipo
       switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = "Transporte"
                break
       }
       //criando as colunas td
       linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` //(d.dia + '/' + d.mes + '/' + d.ano) - interpolação
       linha.insertCell(1).innerHTML = `${d.tipo}`
       linha.insertCell(2).innerHTML = `${d.descricao}`
       linha.insertCell(3).innerHTML = `${d.valor}`
   })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    
    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas)
}