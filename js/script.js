document.getElementById('formulario').addEventListener('submit', cadastrarCurso)

function cadastrarCurso(e) {
    nomeCurso = document.getElementById('form-nome').value
    dataInicioCurso = document.getElementById('form-dataInicio').value
    dataFimCurso = document.getElementById('form-dataFim').value
    duracaoCurso = document.getElementById('form-duracao').value
    descricaoCurso = document.getElementById('form-desc').value

    /*--- data formatada ---*/
    var dataInicio = new Date(dataInicioCurso)
    var dataInicioF = ((dataInicio.getDate() )) + "/" +(((dataInicio.getMonth() < 10 ? "0" + (dataInicio.getMonth() + 1) : dataInicio.getMonth() + 1))) + "/" + dataInicio.getFullYear()

    var dataFim = new Date(dataFimCurso)
    var dataFinalF = ((dataFim.getDate() )) + "/" + (((dataFim.getMonth() < 10 ? "0" + (dataFim.getMonth() + 1) : dataFim.getMonth() + 1))) + "/" + dataFim.getFullYear()


    /*--- condição data ---*/
    if (dataFimCurso < dataInicioCurso) {
        Alert.render("Data não permitida")
        e.preventDefault()
        return
    }

    var curso = {
        nome: nomeCurso,
        dataInicio: dataInicioF,
        dataFinal: dataFinalF,
        duracao: duracaoCurso,
        descricao: descricaoCurso
    }

    /*--- verificando duplicidade ref-nome ---*/
    try{
        var cursos = JSON.parse(localStorage.getItem('listaCursos'))
        for(var i = 0; i < cursos.length; i++){
            if(nomeCurso == cursos[i].nome){
                Alert.render("Ops! Já tem um curso cadastrado com esse nome!")
                e.preventDefault()
                return
            }
        }
    }catch(e){
        console.log("Erro: " + e)
    }

    /*--- salvando no localStorange ---*/
    if (localStorage.getItem('listaCursos') === null) {
        var cursos = []
        cursos.push(curso)
        localStorage.setItem('listaCursos', JSON.stringify(cursos))
        Alert.render('Curso cadastrado com sucesso')
    }else {
        var cursos = JSON.parse(localStorage.getItem('listaCursos'))
        cursos.push(curso)
        localStorage.setItem('listaCursos', JSON.stringify(cursos))
        Alert.render('Curso cadastrado com sucesso')
    }

    
    e.preventDefault()
    mostrarCadastros()

    /*--- limpando os campos ---*/
    document.getElementById('formulario').reset()
}

/*--- adiciona os cursos na tabela ---*/
function mostrarCadastros() {
    var cursos = JSON.parse(localStorage.getItem('listaCursos'))
    var listaResultados = document.getElementById('resultado')

    listaResultados.innerHTML = '';

    for (var i = 0; i < cursos.length; i++) {
        var nome = cursos[i].nome;
        var inicio = cursos[i].dataInicio;
        var fim = cursos[i].dataFinal;
        var duracao = cursos[i].duracao;
        var descricao = cursos[i].descricao;

        listaResultados.innerHTML += '<tr class="tbodyTr" ondblclick="apagar(\'' + nome + '\')"><td class="nomeCurso" >' + nome +
            '</td><td>' + duracao +
            '</td><td>' + inicio +
            '</td><td>' + fim +
            '</td></tr>'
    }
}

/*--- filtro ---*/
var campoFiltro = document.querySelector('#pesquisa-cursos')

campoFiltro.addEventListener('input', function () {
    var cursos = document.querySelectorAll(".tbodyTr")

    if (this.value.length > 0) {
        for (var i = 0; i < cursos.length; i++) {
            var curso = cursos[i];
            var nomeCurso = curso.querySelector(".nomeCurso")
            var nome = nomeCurso.textContent
            var expressao = new RegExp(this.value, "i")

            if (!expressao.test(nome)) {
                curso.classList.add("invisivel")
            } else {
                curso.classList.remove("invisivel")
            }
        }
    } else {
        for (var i = 0; i < cursos.length; i++) {
            var curso = cursos[i]
            curso.classList.remove("invisivel")
        }
    }
})

/*--- apagar ---*/
function apagar(nome) {
    var cursos = JSON.parse(localStorage.getItem('listaCursos'))

    for (var i = 0; i < cursos.length; i++) {
        if (cursos[i].nome == nome) {
            cursos.splice(i, 1); //Alert.render(cursos[i].descricao)
        }
        localStorage.setItem('listaCursos', JSON.stringify(cursos))
        mostrarCadastros()
    }
}
