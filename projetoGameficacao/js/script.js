let contDisciplina = 0;
let verifDisciplina = 0;
let contTema = 0;
let listaDisciplina = [];
let listaTema = [];
let temasDisciplina = [];

function inicio() {
    document.getElementById("inicio").innerHTML = `
        <p class="text-center">Bem vindo(a) ao sistema de monitoramento do progresso de seu curso.</p>
        <p class="text-center">Preencha os campos abaixo conforme solicitado.</p>
        <br>
        <input type="text" class="form-control" id="cursoInput" placeholder="Nome do curso">
        <button class="mt-2 btn btn-secondary" id="botaoCurso" onclick="curso()">Adicionar</button>
        <div class="progress-bar" style="width: 25%"></div>
    `;
    cursoInput.focus();
    var input = document.getElementById("cursoInput");
    input.addEventListener("keypress",
        function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("botaoCurso").click();
            }
        });
}

function curso() {
    $('#curso').append(`${cursoInput.value}`);
    $('#cursoNavBar').append(`${cursoInput.value}`);
    cadastroDisciplina();
}

function cadastroDisciplina() {
    contDisciplina++;
    contTema = 0;
    document.getElementById("inicio").innerHTML = `
            <p class="text-center">Bem vindo(a) ao sistema de monitoramento do progresso de seu curso.</p>
            <p class="text-center">Preencha os campos abaixo conforme solicitado.</p>
            <br>
            <input type="text" class="form-control" id="disciplinaInput" placeholder="Nome da disciplina">
            <button class="mt-2 btn btn-secondary" id="botaoDisciplina" onclick="adicionarDisciplina()">Adicionar</button>
            <button class="mt-2 btn btn-secondary" id="botaoFim" onclick="parar()">Encerrar</button>
        `;
    disciplinaInput.focus();
    var input = document.getElementById("disciplinaInput");
    input.addEventListener("keypress",
        function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("botaoDisciplina").click();
            }
        });
}

function adicionarDisciplina() {
    $('#containerDisciplinas').append(`<div id="aside${contDisciplina}" class="row p-3 navbar"><button id="button${contDisciplina}" class="text-start col navbar-toggler" data-bs-toggle="collapse" data-bs-target="#disciplina${contDisciplina}" data-bs-parent="containerDisciplinas">${disciplinaInput.value}</button><div class="collapse ms-0 navbar-collapse ident" id="disciplina${contDisciplina}"><ul id="${contDisciplina}" onclick="geraPagina(this.id)" class="collapse show nav-link active"></ul></div></div>`);
    listaDisciplina.push(disciplinaInput.value);
    cadastroTema();
}

function cadastroTema() {
    contTema++;
    document.getElementById("inicio").innerHTML = `
            <p class="text-center">Bem vindo(a) ao sistema de monitoramento do progresso de seu curso.</p>
            <p class="text-center">Preencha os campos abaixo conforme solicitado.</p>
            <br>
            <input type="text" class="form-control" id="temaInput" placeholder="Tema ${contTema}">
            <button class="mt-2 btn btn-secondary" id="botaoTema" onclick="adicionarTema()">Adicionar tema</button>
            <button class="mt-2 btn btn-secondary" id="botaoVoltar" onclick="quantidadeTema();cadastroDisciplina();">Adicionar disciplina</button>
            <button class="mt-2 btn btn-secondary" id="botaoFim" onclick="quantidadeTema();parar()">Encerrar</button>
        `;
    temaInput.focus();
    var input = document.getElementById("temaInput");
    input.addEventListener("keypress",
        function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("botaoTema").click();
            }
        });
}

function adicionarTema() {
    $(`#${contDisciplina}`).append(`<li index="${contTema}" id="tema${contDisciplina}.${contTema}" class="nav-item" >${contTema}- ${temaInput.value}</li>`);
    listaTema.push(temaInput.value);
    verifDisciplina = 1;
    cadastroTema();
}

function quantidadeTema() {
    temasDisciplina.push(contTema - 1);
}

function parar() {
    if (verifDisciplina == 0) {
        window.alert('Cadastre ao menos uma disciplina');
        cadastroDisciplina();
    } else {
        document.getElementById("inicio").innerHTML = `
            <p class="text-center">Selecione uma disciplina para ver o progresso.</p>
        `;
    }
}

function geraPagina(disciplinaSelecionada) {
    let x = 0;
    if (disciplinaSelecionada - 1 > 0) {
        for (var i = 0; i < disciplinaSelecionada - 1; i++) {
            x = x + temasDisciplina[i];
        }
    }
    temasDisciplina[disciplinaSelecionada - 1];
    document.getElementById("inicio").innerHTML = `
        <h2>${listaDisciplina[disciplinaSelecionada - 1]}</h2>
        <br>
        <br>
    `;
    for (y = 0; y < temasDisciplina[disciplinaSelecionada - 1]; y++) {
        document.getElementById("inicio").innerHTML += `
        ${listaTema[x + y]}
        <div class="progress" role="progressbar" aria-label="Animated striped example">
            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 60%"></div>
        </div>
        <br>
        `;
    }
}