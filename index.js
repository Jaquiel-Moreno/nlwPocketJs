

const { select } = require('@inquirer/prompts')



const start = async () => {

    while (true) {

        const opcao = await select({

            message: "Menu >",
            choices: [
                {

                    name: "Cadastrar metas",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                console.log("vamos Cadastrar")
                break

            case "listar":
                console.log("Vamos Listar")
                break

            case "sair":
                console.log("Até a próxima")
                return
        }

    }
}
start()
