
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(function () {
    console.log("MongoDB connected")
}).catch(function (err) {
    console.log("Fail to connect on MongoDB")
})
////////////////////////////////////////////////////////////////////////////////////
const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String, // tipo da variável
        require: false // se o registro é obrigatório ou não 
    },
    email: {
        type: String, // tipo da variável
        require: false // se o registro é obrigatório ou não 
    },
    nascimento: {
        type: String, // tipo da variável
        require: false // se o registro é obrigatório ou não 
    },
    cidade: {
        type: String, // tipo da variável
        require: false // se o registro é obrigatório ou não 
    },
    estado: {
        type: String, // tipo da variável
        require: false // se o registro é obrigatório ou não 
    },
    pais: {
        type: String, // tipo da variável
        require: false // se o registro é obrigatório ou não 
    },
    telefone: {
        type: String, // tipo da variável
        require: false // se o registro é obrigatório ou não 
    }
})

mongoose.model('UsuarioCollection', UsuarioSchema)
const Usuario = mongoose.model('UsuarioCollection')

////////////////////////////////////////////////////////////////////////////////////

// função create (INSERT)  
function Criar(nome, email, nascimento, cidade, estado, pais, telefone) {
    new Usuario({
        nome: nome,
        email:email,
        nascimento:nascimento,
        cidade: cidade,
        estado: estado,
        pais: pais,
        telefone: telefone
    }).save().then(function(){
        console.log("Usuário criado")
    }).catch(function(err){
        console.log("Houve um erro ao registrar no banco de dados: " + err)
    })
}

// função read (SELECT)

function LerTodos(){
    return Usuario.find({}).lean()
}

function LerPorNome(findName){
    return Usuario.find({nome: findName}).lean()
}
function LerPorId(findId){
    return Usuario.find({_id: findId}).lean()
}

// função UPDATE by ID 

function Update(UpId, UpNome, UpEmail, UpNascimento, UpCidade, UpEstado, UpPais, UpTelefone){
    Usuario.findByIdAndUpdate(UpId, { nome: UpNome, email: UpEmail, nascimento: UpNascimento, cidade: UpCidade, estado: UpEstado, pais: UpPais, telefone: UpTelefone }, {new: true}, function(error){});
}


// função DELETE by ID (DROP) 

function Delete(DelId){
    return Usuario.findByIdAndDelete(DelId)
}

// exportação de recursos para outros arquivos
module.exports={
    Criar,
    LerTodos,
    LerPorNome,
    LerPorId,
    Delete,
    Update
}
