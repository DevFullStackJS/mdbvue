export default {
  inserted(el, binding) {
    el.dummy = {
      value: binding.value,
      arg: binding.arg
    };

    el.dummy.generateText = (length = 100) => {
      const words = [
        "radioelement",
        "actinolitic",
        "chromic",
        "strikeboard",
        "cloverleaf",
        "trimming",
        "heedfulness",
        "phenylamine",
        "alloplasmatic",
        "winnipeg",
        "savour",
        "airwoman",
        "compute",
        "nitrobenzene",
        "coinstantaneously",
        "havel",
        "stimulatingly",
        "superextreme",
        "noyau",
        "stark",
        "preelect",
        "scripture",
        "rubric",
        "revoted",
        "melchizedek",
        "intertidal",
        "immorally",
        "spacious",
        "dodecastylar",
        "modulate",
        "botulinuses",
        "aimlessly",
        "mirkier",
        "cadman",
        "yokel",
        "cactaceous",
        "blame",
        "bridelike",
        "unexported",
        "diapedesis",
        "irritate",
        "accuracy",
        "keyman",
        "habitudinal",
        "outraved",
        "militancy",
        "contrive",
        "unacetic",
        "homoeopath",
        "snippiness",
        "nonnobility",
        "stambul",
        "schumpeter",
        "eulis",
        "gavin",
        "rainproof",
        "philonis",
        "xograph",
        "ester",
        "anaglyph",
        "equities",
        "biosphere",
        "premeditatingly",
        "marg",
        "stephanie",
        "dauk",
        "nomad",
        "bootie",
        "clark",
        "spouter",
        "crackly",
        "corticate",
        "hipping",
        "contemptuous",
        "unfree",
        "swagman",
        "bedizenment",
        "snakeweed",
        "reoperate",
        "valorise",
        "dido",
        "cated",
        "anatolian",
        "stupefy",
        "camaraderie",
        "kenny",
        "sweat",
        "vaporimeter",
        "lineamental",
        "overcriticized",
        "nonphilosophy",
        "politicalize",
        "professed",
        "milstein",
        "unit",
        "revaccinate",
        "parochial",
        "soc",
        "cudbear",
        "intercarpellary",
        "precociousness",
        "pretaste",
        "holophyte",
        "scarless",
        "rekindle",
        "reappearance",
        "dimensionless",
        "julienne",
        "gasholder",
        "fluidally",
        "teutonism",
        "legroom",
        "adolescent",
        "camila",
        "agana",
        "overcertify",
        "disembowelment",
        "anemochorous",
        "discreditability",
        "unincludible",
        "folia",
        "frankfurter",
        "maravedi",
        "tribunitial",
        "boulle",
        "pretincture",
        "hermetical",
        "impanel",
        "underyoke",
        "beset",
        "scoff",
        "exophthalmos",
        "manly",
        "nahant",
        "sandarac",
        "diseasing",
        "dolphinfishes",
        "desulfurization",
        "inescapableness",
        "solum",
        "outthrow",
        "rareripe",
        "highness",
        "synonymized",
        "attractive",
        "residency",
        "predaciou",
        "dosshouse",
        "crookesite",
        "unmoldy",
        "drawability",
        "comedical",
        "chromoplasmic",
        "unillusioned",
        "altimetrical",
        "araucan",
        "conveyor",
        "laggardness",
        "unpolitely",
        "strutting",
        "bloodwort",
        "hysteretically",
        "baalistic",
        "contritely",
        "nonexcavation",
        "mdoc",
        "benthamite",
        "moseley",
        "coercively",
        "horologe",
        "bivalvular",
        "agribusiness",
        "norbert",
        "invigorated",
        "imprudently",
        "trippingly",
        "mds",
        "unabatable",
        "assidaean",
        "glandes",
        "reidentify",
        "fluffier",
        "geek",
        "unstunned",
        "battue",
        "innutritious",
        "terminism",
        "cannibalistically",
        "flowerage",
        "duopoly",
        "jurisp",
        "exitance",
        "menace",
        "speciously",
        "ungossiping",
        "realizable",
        "candlenut",
        "uncombinational",
        "semifrontier",
        "pseudopolitical",
        "atomize",
        "brunetness",
        "reperused",
        "leverrier",
        "unaccustomed",
        "aeaea",
        "monopsony",
        "posttibial",
        "filbert",
        "pellucidity",
        "italian",
        "preinstructional",
        "balkanised",
        "sanctity",
        "multigravida",
        "study",
        "hulloo",
        "gyges",
        "tiglinic",
        "dubonnet",
        "postfebrile",
        "cotype",
        "abbreviator",
        "saffian",
        "zogan",
        "pfitzner",
        "decampment",
        "predictated",
        "prejudgement",
        "gormandising",
        "thoreau",
        "ruralised",
        "laryngeal",
        "coleridgian",
        "azerbaijani",
        "featherlike",
        "alogi",
        "dunstable",
        "punish",
        "energistic",
        "newsbeat",
        "keswick",
        "noncommutative",
        "totable",
        "pothunting",
        "steatite",
        "typikon",
        "unanswering",
        "repositories",
        "peduncle",
        "stirpiculture",
        "varietally",
        "burletta",
        "salvia",
        "farraginous",
        "anteroom",
        "rhamnaceous",
        "southernwood",
        "hyporight",
        "dysteleological",
        "kilopound",
        "hyperbatic",
        "barquisimeto",
        "unfitly",
        "humorless",
        "untackling",
        "doom",
        "beefless",
        "gruesomeness",
        "yeastlike",
        "leucosis",
        "enrober",
        "canton",
        "gutterlike",
        "plesiosaur",
        "shaksperian",
        "ramayana",
        "factorize",
        "currieries",
        "carracci",
        "unrevoked",
        "purposed",
        "kline",
        "sanderling",
        "inculpatory",
        "postgenial",
        "holism",
        "clearly",
        "alfur",
        "tuberless",
        "perugino",
        "instilment",
        "reamendment",
        "trinitrophenylmethylnitramine",
        "intertrafficking",
        "predeterminate",
        "cataplane",
        "bleariest"
      ];

      const getWord = () => {
        return words[Math.floor(Math.random() * words.length)];
      };

      let text = getWord();
      text = text.charAt(0).toUpperCase() + text.slice(1);

      while (text.length < length) {
        text += " " + getWord();
      }

      text = text.slice(0, length);

      return text;
    };

    el.dummy.findElements = (parent, tag) => {
      const nodes = [];
      const checkElement = el => {
        if (el.tagName && el.tagName.toLowerCase() === tag) nodes.push(el);
        else if (el.childNodes) {
          el.childNodes.forEach(node => checkElement(node));
        }
        return;
      };

      checkElement(parent);

      return nodes;
    };

    el.dummy.generateImg = value => {
      let query = 150;
      if (typeof value === "number") query = value;
      else if (value !== undefined)
        query = `${value.width || 150}x${value.height || 150}`;

      return `https://via.placeholder.com/${query}`;
    };

    el.dummy.generateTable = data => {
      let { rows = 10, columns = 5 } = data || {};

      const dummyColumns = new Array(Number(columns)).fill("Column");

      const dummyRow = new Array(Number(columns)).fill("Row");

      const dummyRows = new Array(Number(rows)).fill(dummyRow);

      const htmlContent = `
      <thead>
        <tr>
          ${dummyColumns.map(col => `<th>${col}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${dummyRows
          .map(row => {
            return `
            <tr>
            ${row.map(cell => `<td>${cell}</td>`).join(" ")}
            </tr>
          `;
          })
          .join(" ")}
      </tbody>`;

      return htmlContent;
    };

    el.dummy.generateList = (length = 5) => {
      const dummyItem = "<li>List item</li>";
      const list = new Array(Number(length)).fill(dummyItem).join(" ");
      return list;
    };

    el.dummy.generatePlaceholders = () => {
      switch (el.dummy.arg) {
        case "text":
          el.innerText = el.dummy.generateText(el.dummy.value);
          break;
        case "img":
          el.dummy
            .findElements(el, "img")
            .forEach(img => (img.src = el.dummy.generateImg(el.dummy.value)));
          break;
        case "table":
          el.innerHTML = el.dummy.generateTable(el.dummy.value);
          break;
        case "list":
          el.innerHTML = el.dummy.generateList(el.dummy.value);
          break;
      }
    };

    el.dummy.generatePlaceholders();
  },
  update(el, binding) {
    if (el.dummy.value !== binding.value) {
      el.dummy.value = binding.value;

      el.dummy.generatePlaceholders();
    }
  }
};
