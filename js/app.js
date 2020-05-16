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
    }else{
        document.getElementById('modalTitulo').innerHTML = 'Erro ao Registrar'
        document.getElementById('classeModal').className = 'modal-header text-danger'
        document.getElementById('modalConteudo').innerHTML = 'Exitem campos obrigatórios que não foram preenchidos'
        document.getElementById('classeModalBtn').className = 'btn btn-danger'
        document.getElementById('classeModalBtn').innerHTML = 'Corrigir'
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas(){
    let despesas = Array()
   despesas = bd.recuperarRegistros()
   console.log(despesas)
}