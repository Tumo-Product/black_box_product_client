const modules = {
    all: {},
    moduleShown: -1
}

const onPageLoad = async () => {
    let data = await parser.dataFetch();
    modules.all = data.modules;
    view.toggleLoadingScreen();
    addModules(modules.all);
}

const addModules = (modules) => {
    for (let i = 0; i < modules.length; i++) {
        view.drawModule(modules[i].img, i);
    }
}

const onModuleClick = (i) => {
    if (modules.moduleShown == i) {
        view.hideSideBar();
        modules.moduleShown = -1;
    }
    else {
        view.showSideBar(modules.all[i].name);
        modules.moduleShown = i;
        console.log(modules.moduleShown);
    }
}

const implementQuestion = (question) => {
    view.setQuestionName(question.text);
    view.setButtons(question.answers);
}

const onButtonClick = (id) => {
    view.changeColor(id, "grey");
    flow_data.score += flow_data.set_data.questions[flow_data.index].answers[id].points;
    nextQuestion();
}

const onPlay = () => {
    view.hideElement("name");
    view.hideElement("play");
    implementQuestion(flow_data.set_data.questions[0]);
}

$(onPageLoad())
