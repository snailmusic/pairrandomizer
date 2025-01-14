let group1 = document.getElementById("group1"); 
let group2 = document.getElementById("group2"); 

group1.value = localStorage.getItem("g1v")
group2.value = localStorage.getItem("g2v")

displayPairs(
    JSON.parse(localStorage.getItem("p1")),
    JSON.parse(localStorage.getItem("p2"))
)

function gen() {
    const amt = Number(document.getElementById("amt").value);

    let glist1 = group1.value.split(", ")
    let glist2 = group2.value.split(", ")

    if (glist1.length <= 1 || glist2.length <= 1) {
        alert("you must put in a comma separated list in both textboxes!")
        return
    }

    let pair1 = genPairs(glist1, amt)
    let pair2 = genPairs(glist2, amt)

    localStorage.setItem("p1", JSON.stringify(pair1))
    localStorage.setItem("p2", JSON.stringify(pair2))

    displayPairs(pair1, pair2);
}

function displayPairs(pair1, pair2) {
    const disp1 = document.getElementById("disp1");
    const disp2 = document.getElementById("disp2");
    disp1.innerText = pair1.map((val) => val.join(" & ")).join("\n");
    disp2.innerText = pair2.map((val) => val.join(" & ")).join("\n");
}

function genPairs(list, amt) {
    var list = [...list]
    let out = []
    out.length = Math.ceil(list.length / amt)
    while (list.length > 0) {
        for (let i = 0; i < out.length; i++) {
            if (out[i] == undefined) {out[i] = []}
            if (list.length == 0) {
                break
            }
            let idx = Math.floor(Math.random() * list.length)
            out[i].push(...list.splice(idx, 1))
        }
    }

    let i = out.findIndex((val)=> val.length <= 1)
    while (i != -1) {
        let to_move = out.splice(i, 1)

        for (let index = 0; index < to_move.length; index++) {
            const element = to_move[index];
            out[index % out.length].push(element)
        }

        i = out.findIndex((val)=> val.length <= 1)
    }

    return out
}

function saveData() {
    // const group1 = document.getElementById("group1").value; 
    // const group2 = document.getElementById("group2").value; 

    localStorage.setItem("g1v", group1.value);
    localStorage.setItem("g2v", group2.value);
}