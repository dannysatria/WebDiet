// c:\Users\Dio\OneDrive\Documents\Web Project\web_semantic\diet_semantic_web\src\services\querryRDF.js

// Define your queries as constants
const queryBahanDarihewan = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type makanan_diet:darihewan .
    }
`;

const queryBahanDariTumbuhan = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type makanan_diet:dariTumbuhan .
    }
`;
const queryBahanPokok = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type makanan_diet:pokok .
    }
`;
const queryHidanganUtama = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type makanan_diet:hidanganaUtama .
    }
`;
const queryMinuman = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type makanan_diet:minuman .
    }
`;
const querySnack = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan rdf:type makanan_diet:snack .
    }
`;
// diet querry
const queryDietDash = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:masukKeDiet makanan_diet:dietDASH .
    }
`;
const queryDietIntermittent = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:masukKeDiet makanan_diet:dietIntermittentFasting .
    }
`;
const queryDietKatogenik = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:masukKeDiet makanan_diet:dietKetogenik .
    }
`;
const queryDietLowCarb = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:masukKeDiet makanan_diet:dietLowCarb .
    }
`;
const queryDietMediterania = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:masukKeDiet makanan_diet:dietMediterania .
    }
`;
const queryDietVegan = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:masukKeDiet makanan_diet:vegan .
    }
`;
const queryMakananTinggiKalori = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:mengandung makanan_diet:tinggiKalori .
    }
`;
const queryMakananTinggiKarbo = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:mengandung makanan_diet:tinggiKarbo .
    }
`;
const queryMakananTinggiLemak = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:mengandung makanan_diet:tinggiLemak .
    }
`;
const queryMakananTinggiProtein = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:mengandung makanan_diet:tinggiProtein .
    }
`;
const queryMakananTinggiSerat = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX makanan_diet: <http://www.semanticweb.org/danny/2024/5/makanan_diet#>

    SELECT ?makanan
    WHERE {
    ?makanan makanan_diet:mengandung makanan_diet:tinggiSerat .
    }
`;

// Export an object containing your queries
export const queries = {
  bahanDarihewan: queryBahanDarihewan,
  bahanDaritumbuhan: queryBahanDariTumbuhan,
  bahanPokok: queryBahanPokok,
  hidanganUtama: queryHidanganUtama,
  minuman: queryMinuman,
  snacks: querySnack,
  dietDash: queryDietDash,
  dietIntermitten: queryDietIntermittent,
  dietKatogenik: queryDietKatogenik,
  dietLowCarb: queryDietLowCarb,
  dietMediterania: queryDietMediterania,
  dietVegan: queryDietVegan,
  tinggiKalori: queryMakananTinggiKalori,
  tinggiKarbo: queryMakananTinggiKarbo,
  tinggiLemak: queryMakananTinggiLemak,
  tinggiProtein: queryMakananTinggiProtein,
  tinggiSerat: queryMakananTinggiSerat,
  // Add more queries as needed
};
