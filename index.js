

const { select, input, checkbox } = require('@inquirer/prompts')

let menssagem = "bem vindo ao app de Metas!!";

let meta = {
    value: 'Tomar  3L de agua por dia',
    checked: false,

}

let metas = [meta]

//Declaração de uma função

const cadastrarMetas = async () => {

    const meta = await input({ message: "Digite a meta: " })

    if (meta.length == 0) {

        menssagem = "A meta não pode ser vazia."
        return

    }

    metas.push({

        value: meta,
        checked: false,
    })

    menssagem = "Meta cadastrda com sucesso"

}

//Declaração de uma função

const listarMetas = async () => {

    const respostas = await checkbox({

        message: "Use as setas para mudar de metas, o espaço para marcar e desmarcar  e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) =>{

        m.checked = false
    })

    if (respostas.length == 0) {

       menssagem = "Nenhuma meta selecionada."
        return
    }

  

    respostas.forEach((resposta) => {

        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

   menssagem = 'Meta(s) marcadas como concluida(s)' 
}

const metasRealizadas = async () => {

    const realizadas = metas.filter((meta) => {

        return  meta.checked
    })
    if(realizadas.length == 0){
        menssagem = 'Não existe metas realizadas.' 
        return
    }

    await select({

        message: "Metas realizadas:  " + realizadas.length,
        choices: [...realizadas]
    })
} 

const metasAbertas = async () => {

    const abertas = metas.filter((meta) => {

        return meta.checked != true

    })

    if(abertas.length == 0 ){

        menssagem = "Não existe metas abertas!  :) "
        return
    }

    await select({

        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () =>{

    const metasDesmarcadas = metas.map((meta) => {

        meta.checked = false
        return { value: meta.value, checked: false }

    })
    
    const itensADeletar = await checkbox({

        message: "Selecione item para deletar:  :)",
        choices: [...metasDesmarcadas],
        instructions: false,
    })
    if(itensADeletar.length == 0){

    menssagem = "Nenhum item selecionado para deletar."
      return
    }
    itensADeletar.forEach((item) => {

        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    menssagem =  "Meta (s) Deletada (s) com sucesso :) "

}

const mostrarMessage = () =>{

    console.clear();

    if(menssagem != ""){

        console.log(menssagem)

        console.log("")

        menssagem = ""
    }
}


const start = async () => {

    while (true) {

        mostrarMessage()

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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                await cadastrarMetas()
                break

            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break  

            case "abertas":
                await metasAbertas()
                break  

            case "deletar":
                await deletarMetas()
                break

            case "sair":
                console.log("Até a próxima")
                return
        }

    }
}
start()
