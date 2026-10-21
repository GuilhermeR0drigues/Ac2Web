let teacherList = [];

export const ListTeachers = (req, res)=>{
    if(teacherList.length > 0) {
        res.status(200).json({ teacherList })
    }else{
        return res.status(404).json({
            error: "Não foram encontrados professores"
        })
    }
} 

export const getTeachersById = (req, res) => {
    const { id } = req.params
    const teacher = teacherList.find(teacher => teacher.id === Number(id))
    if(teacher){
        return res.status(200).json({ teacher })
    }else{
        return res.status(404).json({
            error: "Não foram encontrados professores"
        })
    }
}

export const listClasses = (req, res) => {
    const classes = teacherList.flatmap((teacher) =>
        Array.isArray(teacher.turmas) ? teacher.turmas : [],
    );
    if(classes.length === 0){
        return res.status(404).json({
            error: "Não foram encontrados professores",
        })
    }
    return res.status(200).json({ classes });
};

export const createTeacher = (req, res) => {
    const { id,nome, idade, departamento,turmas } = req.body;
    const newTeacher = {
        id,
        nome,
        idade,
        departamento,
        turmas,
    };
    teacherList.push(newTeacher);
    return res.status(201).json({ newTeacher})
};

export const addClass = (req, res) => {
    const { id } = req.params
    const { turma } = req.body
    const teacher = teacherList.find(teacher => 
        teacher.id === Number(id)
    )
    if(!teacher){
        return res.status(404).json({
            error: "Não foram encontrados professores",
        })
    }teacher.turmas.push(turma)
    return res.status(201).json({ turma })
}

export const listDepartamento = (req, res) => {
    const { nome } = req.query
    const lowerDept = nome.toLowerCase()
    const teacher = teacherList.filter(teacher =>
        teacher.departamento.toLowerCase().includes(lowerDept)
    )
    if(teacher.length > 0){
        return res.status(201).json({ teacher })
    }else {
        return res.status(404).json({
            error: "Não foram encontrados departamentos",
        })
    }
}

export const deleteTeacher = (req, res) => {
    const { id } = req.params
    const index = teacherList.findIndex(teacher =>
        teacher.id === Number(id)
    )
    if(index !== -1){
        const deletedTeacher = teacherList.splice(index, 1)
        return res.status(201).json(deletedTeacher[0])
    }else{
        return res.status(404).json({
            error: "Não foram encontrados professores",
        })
    }
}

export const updateTeacher = (req, res) => {
    const { id } = req.params
    const { nome, idade, departamento, turmas } = req.body
    const teacher = teacherList.find(teacher => 
        teacher.id === Number(id)
    )
    if(teacher) {
        teacher.nome = nome;
        teacher.idade = idade;
        teacher.departamento = departamento;
        teacher.turma = turmas;
        return res.status(201).json({ teacher })
    }else{
        return res.status(404).json({
            error: "Não foram encontrados professores",
        })
    }
}
