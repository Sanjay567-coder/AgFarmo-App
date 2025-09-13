const pesticideDatabase = {
  wheat: {
    "10 days": {
      pesticide: "Imidacloprid",
      amount: 2.5,
      description: "Imidacloprid is a systemic insecticide used to control a wide range of insect pests in wheat crops, including aphids, leafhoppers, and wireworms. It works by disrupting the nervous system of the pests, leading to paralysis and eventual death."
    },
    "30 days": {
      pesticide: "Triadimefon",
      amount: 3.0,
      description: "Triadimefon is a fungicide that effectively controls fungal diseases in wheat, such as rust and mildew. It prevents the development and spread of these diseases, helping to maintain healthy wheat crops."
    },
    "50 days": {
      pesticide: "Metsulfuron-methyl",
      amount: 4.0,
      description: "Metsulfuron-methyl is a selective herbicide that targets broadleaf weeds in wheat fields. It inhibits weed growth by interfering with their ability to produce essential amino acids."
    },
    "80 days": {
      pesticide: "Lambda-cyhalothrin",
      amount: 2.0,
      description: "Lambda-cyhalothrin is an insecticide that offers effective control of various wheat pests, including armyworms and leafhoppers. It works by disrupting the nervous system of the insects, leading to paralysis and death."
    },
  },
  corn: {
    "10 days": {
      pesticide: "Chlorpyrifos",
      amount: 1.5,
      description: "Chlorpyrifos is a broad-spectrum insecticide that provides effective control of corn pests, such as corn borers and armyworms. It acts on the nervous system of insects, causing paralysis and death."
    },
    "40 days": {
      pesticide: "Tebuconazole",
      amount: 2.0,
      description: "Tebuconazole is a systemic fungicide used to protect corn crops from fungal diseases, including rust and gray leaf spot. It prevents the growth and spread of these pathogens."
    },
    "60 days": {
      pesticide: "Atrazine",
      amount: 3.0,
      description: "Atrazine is a selective herbicide that controls a wide range of grassy and broadleaf weeds in corn fields. It inhibits weed growth by disrupting photosynthesis."
    },
    "90 days": {
      pesticide: "Cypermethrin",
      amount: 2.5,
      description: "Cypermethrin is an insecticide that effectively manages corn pests like thrips and corn earworm. It acts on the nervous system of insects, leading to paralysis and death."
    },
  },
  rice: {
    "10 days": {
      pesticide: "Bifenthrin",
      amount: 2.0,
      description: "Bifenthrin is an insecticide used for controlling a variety of rice pests, including stem borers and leafhoppers. It disrupts the insects' nervous system, resulting in paralysis and death."
    },
    "30 days": {
      pesticide: "Tricyclazole",
      amount: 2.5,
      description: "Tricyclazole is a fungicide that effectively manages rice diseases such as blast and sheath blight. It prevents the development and spread of these fungal pathogens."
    },
    "50 days": {
      pesticide: "Butachlor",
      amount: 3.5,
      description: "Butachlor is a selective herbicide that controls grassy and broadleaf weeds in rice fields. It inhibits weed growth by inhibiting their ability to synthesize essential amino acids."
    },
    "80 days": {
      pesticide: "Cypermethrin",
      amount: 3.0,
      description: "Cypermethrin is an insecticide used to manage rice pests like leaf folder and green leafhopper. It acts on the nervous system of insects, leading to paralysis and death."
    },
  },
  banana: {
    "0 days": {
      pesticide: "Carbendazim",
      amount: 2.5,
      description: "Carbendazim is a broad-spectrum fungicide used to protect bananas from various fungal diseases, including anthracnose and black Sigatoka. It prevents the growth and spread of these pathogens."
    },
    "30 days": {
      pesticide: "Imidacloprid",
      amount: 3.0,
      description: "Imidacloprid is an insecticide used to control common banana pests like banana weevils and aphids. It works by disrupting the nervous system of the pests, leading to paralysis and death."
    },
    "90 days": {
      pesticide: "Propiconazole",
      amount: 2.0,
      description: "Propiconazole is a fungicide used to manage banana diseases such as Panama disease and Sigatoka leaf spot. It prevents the development and spread of these fungal pathogens."
    },
    "180 days": {
      pesticide: "Abamectin",
      amount: 3.5,
      description: "Abamectin is an insecticide used to control mites and other harmful pests in banana plants. It affects the nervous system of the pests, leading to paralysis and death."
    },
  },
  pearl_millet: {
    "10 days": {
      pesticide: "Chlorpyrifos",
      amount: 2.0,
      description: "Chlorpyrifos is an insecticide used to control a variety of pests in pearl millet crops, including aphids and leafhoppers. It acts on the nervous system of the pests, leading to paralysis and death."
    },
    "40 days": {
      pesticide: "Tebuconazole",
      amount: 2.5,
      description: "Tebuconazole is a systemic fungicide that effectively manages fungal diseases in pearl millet, such as downy mildew. It prevents the development and spread of these pathogens."
    },
    "60 days": {
      pesticide: "Atrazine",
      amount: 3.0,
      description: "Atrazine is a selective herbicide that controls grassy and broadleaf weeds in pearl millet fields. It inhibits weed growth by disrupting photosynthesis."
    },
    "90 days": {
      pesticide: "Cypermethrin",
      amount: 3.5,
      description: "Cypermethrin is an insecticide used to manage pests like the pearl millet head miner. It acts on the nervous system of insects, leading to paralysis and death."
    },
  },
  cotton: {
    "10 days": {
      pesticide: "Imidacloprid",
      amount: 2.5,
      description: "Imidacloprid is an insecticide used to control cotton pests like aphids and whiteflies. It disrupts the nervous system of the pests, leading to paralysis and death."
    },
    "50 days": {
      pesticide: "Tricyclazole",
      amount: 3.0,
      description: "Tricyclazole is a fungicide that effectively manages fungal diseases in cotton, such as Alternaria leaf spot and powdery mildew. It prevents the growth and spread of these pathogens."
    },
    "70 days": {
      pesticide: "Glyphosate",
      amount: 2.0,
      description: "Glyphosate is a non-selective herbicide used for weed control in cotton fields. It inhibits weed growth by interfering with their ability to produce essential amino acids."
    },
    "100 days": {
      pesticide: "Abamectin",
      amount: 3.5,
      description: "Abamectin is an insecticide used to control pests like cotton bollworms and spider mites. It disrupts the nervous system of the pests, leading to paralysis and death."
    },
  },
  soyabean: {
    "10 days": {
      pesticide: "Chlorpyrifos",
      amount: 2.0,
      description: "Chlorpyrifos is an insecticide used to control soybean pests like aphids and leafhoppers. It acts on the nervous system of the pests, leading to paralysis and death."
    },
    "40 days": {
      pesticide: "Tebuconazole",
      amount: 2.5,
      description: "Tebuconazole is a systemic fungicide that effectively manages fungal diseases in soybean, including rust and powdery mildew. It prevents the development and spread of these pathogens."
    },
    "70 days": {
      pesticide: "Glyphosate",
      amount: 3.0,
      description: "Glyphosate is a non-selective herbicide used for weed control in soybean fields. It inhibits weed growth by interfering with their ability to produce essential amino acids."
    },
    "90 days": {
      pesticide: "Abamectin",
      amount: 3.5,
      description: "Abamectin is an insecticide used to control soybean pests like soybean pod borers. It disrupts the nervous system of the pests, leading to paralysis and death."
    },
  },
  pulses: {
    "10 days": {
      pesticide: "Imidacloprid",
      amount: 2.5,
      description: "Imidacloprid is an insecticide used to control a variety of pests in pulse crops, including aphids and whiteflies. It disrupts the nervous system of the pests, leading to paralysis and death."
    },
    "40 days": {
      pesticide: "Tebuconazole",
      amount: 3.0,
      description: "Tebuconazole is a systemic fungicide that effectively manages fungal diseases in pulses, such as ascochyta blight and rust. It prevents the development and spread of these pathogens."
    },
    "70 days": {
      pesticide: "Glyphosate",
      amount: 2.0,
      description: "Glyphosate is a non-selective herbicide used for weed control in pulse fields. It inhibits weed growth by interfering with their ability to produce essential amino acids."
    },
    "90 days": {
      pesticide: "Abamectin",
      amount: 3.5,
      description: "Abamectin is an insecticide used to control pests like pod borers in pulse crops. It disrupts the nervous system of the pests, leading to paralysis and death."
    },
  },
  sunflower: {
    "10 days": {
      pesticide: "Bifenthrin",
      amount: 2.0,
      description: "Bifenthrin is an insecticide used to control sunflower pests like sunflower moth and leafhoppers. It disrupts the insects' nervous system, leading to paralysis and death."
    },
    "50 days": {
      pesticide: "Tricyclazole",
      amount: 2.5,
      description: "Tricyclazole is a fungicide that effectively manages sunflower diseases such as downy mildew and rust. It prevents the development and spread of these fungal pathogens."
    },
    "70 days": {
      pesticide: "Atrazine",
      amount: 3.0,
      description: "Atrazine is a selective herbicide that controls weeds in sunflower fields. It inhibits weed growth by interfering with their ability to perform photosynthesis."
    },
    "100 days": {
      pesticide: "Cypermethrin",
      amount: 3.5,
      description: "Cypermethrin is an insecticide used to control sunflower pests like aphids and beetles. It acts on the nervous system of insects, leading to paralysis and death."
    },
  },
  mustard: {
    "10 days": {
      pesticide: "Chlorpyrifos",
      amount: 2.5,
      description: "Chlorpyrifos is an insecticide used to control mustard pests like aphids and caterpillars. It acts on the nervous system of the pests, leading to paralysis and death."
    },
    "40 days": {
      pesticide: "Tebuconazole",
      amount: 3.0,
      description: "Tebuconazole is a systemic fungicide used to protect mustard crops from fungal diseases such as white rust and downy mildew. It prevents the development and spread of these pathogens."
    },
    "60 days": {
      pesticide: "Atrazine",
      amount: 2.0,
      description: "Atrazine is a selective herbicide that controls weeds in mustard fields. It inhibits weed growth by interfering with their ability to perform photosynthesis."
    },
    "80 days": {
      pesticide: "Cypermethrin",
      amount: 3.5,
      description: "Cypermethrin is an insecticide used to control mustard pests like aphids and leafhoppers. It acts on the nervous system of insects, leading to paralysis and death."
    },
  },
  sugarcane: {
    "0 days": {
      pesticide: "Carbendazim",
      amount: 2.0,
      description: "Carbendazim is a fungicide used to protect sugarcane from fungal diseases like red rot and smut. It prevents the growth and spread of these pathogens."
    },
    "30 days": {
      pesticide: "Imidacloprid",
      amount: 2.5,
      description: "Imidacloprid is an insecticide used to control sugarcane pests like aphids and whiteflies. It disrupts the nervous system of the pests, leading to paralysis and death."
    },
    "90 days": {
      pesticide: "Propiconazole",
      amount: 3.0,
      description: "Propiconazole is a fungicide used to manage sugarcane diseases such as rust and leaf scald. It prevents the development and spread of these fungal pathogens."
    },
    "180 days": {
      pesticide: "Abamectin",
      amount: 3.5,
      description: "Abamectin is an insecticide used to control sugarcane pests like spider mites and leafhoppers. It affects the nervous system of the pests, leading to paralysis and death."
    },
  },
  barley: {
    "10 days": {
      pesticide: "Imidacloprid",
      amount: 2.5,
      description: "Imidacloprid is an insecticide used to control barley pests like aphids and leafhoppers. It disrupts the nervous system of the pests, leading to paralysis and death."
    },
    "30 days": {
      pesticide: "Triadimefon",
      amount: 3.0,
      description: "Triadimefon is a fungicide that effectively manages fungal diseases in barley, such as powdery mildew and rust. It prevents the development and spread of these pathogens."
    },
    "50 days": {
      pesticide: "Metsulfuron-methyl",
      amount: 4.0,
      description: "Metsulfuron-methyl is a selective herbicide that targets broadleaf weeds in barley fields. It inhibits weed growth by interfering with their ability to produce essential amino acids."
    },
    "80 days": {
      pesticide: "Lambda-cyhalothrin",
      amount: 2.0,
      description: "Lambda-cyhalothrin is an insecticide used to control various barley pests, including armyworms and leafhoppers. It disrupts the nervous system of the pests, leading to paralysis and death."
    },
  },
};
