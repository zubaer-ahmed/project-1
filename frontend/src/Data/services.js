const services = [
  {
    name: "Floor Cleaning",
    id: "floor-cleaning",
    price: 3000,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/1f1990df-a712-4b9b-b6bb-0537479e80d1.png",
    options: [],
  },
  {
    name: "Glass Panel Cleaning",
    id: "glass-panel-cleaning",
    price: 500,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/462a96cd-b0bd-43e2-8294-87fed1d22ae0.png",
    options: [],
  },
  {
    name: "Home Deep Cleaning Service",
    id: "home-deep-cleaning",
    price: 3600,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/8ccbdb98-5480-4f2d-a552-3e0bdc3c894e.png",
    options: [],
  },
  {
    name: "Kitchen Deep Cleaning",
    id: "kitchen-cleaning",
    price: 1100,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/8ee30b6b-c1bf-4b5a-81ac-0a511798be30.png",
    options: [],
  },
  {
    name: "Office Deep Cleaning",
    id: "office-deep-cleaning",
    price: 3000,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/57c83526-3490-4be6-a85d-b115a8ee1aed.png",
    options: [],
  },
  {
    name: "Toilet Cleaning",
    id: "toilet-cleaning",
    price: 799,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/43ab95af-8f92-4893-a3e4-a1f504f26481.png",
    options: [],
  },
  {
    name: "Carpet Cleaning",
    id: "carpet-cleaning",
    price: 800,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/50681eb8-39c7-4f38-9995-83598320b103.png",
    options: [],
  },
  {
    name: "Chair Cleaning",
    id: "chair-cleaning",
    price: 599,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/24aa5446-59c6-4a74-895a-d2841541dce1.png",
    options: [],
  },
  {
    name: "Sofa Cleaning",
    id: "sofa-cleaning",
    price: 795,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/8294c72c-cbbf-49b1-91f0-78ff3af13b6e.png",
    options: [],
  },
  {
    name: "Ceiling Fan Cleaning",
    id: "ceiling-fan-cleaning",
    price: 600,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/8719bde5-9845-4dd2-ba86-8a6d9f52e1fb.png",
    options: [],
  },
  {
    name: "Kitchen Hood Cleaning",
    id: "kitchen-hood-cleaning",
    price: 1000,
    category: ["cleaning"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/kitchen.jpg",
    options: [],
  },
  {
    name: "Oven Cleaning",
    id: "oven-cleaning",
    price: 399,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/82d45ddc-bad6-476a-a888-754b86d0756c.png",
    options: [],
  },
  {
    name: "Refrigerator Cleaning",
    id: "refrigerator-cleaning",
    price: 999,
    category: ["cleaning"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/2b61d672-2dbe-45f2-adc7-2ddef8b57172.png",
    options: [],
  },
  {
    name: "Bedbug Control Service",
    id: "bedbug-control-service",
    price: 1200,
    category: ["bug-control"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/dfe542c8-d940-44b4-9bde-d164f2acf339.png",
    options: [],
  },
  {
    name: "Cockroach Control Service",
    id: "cockroach-control-service",
    price: 1200,
    category: ["bug-control"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/bee56c2d-5f05-4518-a91c-24a1d7a6ca7b.png",
    options: [],
  },
  {
    name: "Rodent Control Service",
    id: "rodent-control-service",
    price: 1200,
    category: ["bug-control"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/890cb287-a3c8-4014-8029-4a4ee9f70bb8.png",
    options: [],
  },
  {
    name: "Termite Control Service",
    id: "termite-control-service",
    price: 2400,
    category: ["bug-control"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/c591213d-db26-412c-8c5c-bf7b56c3969a.png",
    options: [],
  },
  {
    name: "Water Tank Cleaning",
    id: "water-tank-cleaning-6-storied",
    price: 7000,
    category: ["cleaning"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/Water-Tank.png",
    options: [],
  },
  {
    name: "Basic Disinfection Cleaning",
    id: "basic-disinfect-cleaning",
    price: 3500,
    category: ["bug-control"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/d7abfef5-8861-40b2-b66f-932c77e16acc.png",
    options: [],
  },
  {
    name: "Carpentry Inspection",
    id: "carpentry-inspection",
    price: 200,
    category: ["repair"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/c49a622a-fbb3-4acc-87df-b6f174e5b55b.jpeg",
    options: [],
  },
  {
    name: "Computer Servicing",
    id: "computer-servicing",
    price: 200,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/2421f7e9-e41f-4a3c-8067-9b20827b60f0.jpeg",
    options: [],
  },
  {
    name: "OS & Software Installation",
    id: "os-software-installation",
    price: 500,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/500a3518-c52f-4654-9cd9-f1693e6c60d0.jpeg",
    options: [],
  },
  {
    name: "Ceiling Fan Services",
    id: "ceiling-fan-services",
    price: 200,
    category: ["households"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/73745930-ead2-49d0-b6c3-a92665a569b6.png",
    options: [],
  },
  {
    name: "Doorbell Repair",
    id: "doorbell-repair",
    price: 199,
    category: ["households"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/6860f04c-656d-42d8-97b0-c1823beec38b.jpeg",
    options: [],
  },
  {
    name: "Electrical Service",
    id: "electrical-service",
    price: 200,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/f505d71a-e9f8-49cb-8f75-913f92221991.jpeg",
    options: [],
  },
  {
    name: "Exhaust Fan Repair",
    id: "exhaust-fan-repair",
    price: 300,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/93927302-4b6e-4d29-a9d5-3af6ec7efa45.jpeg",
    options: [],
  },
  {
    name: "Switch Repair",
    id: "switch-repair",
    price: 199,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/6f318132-f18a-450c-b374-d62cb60c6c53.jpeg",
    options: [],
  },
  {
    name: "Tube Light Repair",
    id: "tube-light-repair",
    price: 250,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/14e25cb4-ea9a-44ab-9a47-1f6fbf456f9b.jpeg",
    options: [],
  },
  {
    name: "Wall Fan Repair",
    id: "wall-fan-repair",
    price: 250,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/725e87ba-edd7-41b2-8839-dcacb698c92d.jpeg",
    options: [],
  },
  {
    name: "Plumbing Service",
    id: "plumbing-service",
    price: 200,
    category: ["plumbing"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/667f712b-5e5d-44e7-80ec-20e970beed82.jpeg",
    options: [],
  },
  {
    name: "Water Line Repair",
    id: "water-line-repair",
    price: 1000,
    category: ["plumbing"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/3fffc0e9-2d35-438a-baae-ed4ab054b4c5.jpeg",
    options: [],
  },
  {
    name: "AC General Servicing",
    id: "ac-general-servicing",
    price: 499,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/1326d1ce-3e45-444b-8993-b4996d7f27a8.png",
    options: [],
  },
  {
    name: "AC Health Checkup",
    id: "ac-health-checkup",
    price: 300,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/a6cf1c2e-ad82-4324-8220-59ec3eeb26c5.png",
    options: [],
  },
  {
    name: "AC Installation Service",
    id: "ac-installation-service",
    price: 2150,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/cc7c77a2-03e6-4500-9d8d-9ad9c4bc60b7.png",
    options: [],
  },
  {
    name: "AC Leak Test & Repair",
    id: "ac-leak-test-repair",
    price: 1200,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/b89399ce-6219-435e-974a-5dccacb4490b.png",
    options: [],
  },
  {
    name: "AC Master Servicing",
    id: "ac-master-servicing",
    price: 1299,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/324879d9-b584-4374-a344-79cdca8b1c86.png",
    options: [],
  },
  {
    name: "AC R22 Gas Refill Service",
    id: "ac-r22-gas-refill-service",
    price: 2250,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/623e99d4-98dd-42f7-af05-af7aebb176c5.png",
    options: [],
  },
  {
    name: "AC R410 Gas Refill Service",
    id: "ac-r410-gas-refill-service",
    price: 2520,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/5929f548-39b2-47d7-b791-566522624287.png",
    options: [],
  },
  {
    name: "AC Re-install Service",
    id: "ac-re-install-service",
    price: 3500,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/1b8e2ab2-a0d0-4016-beaa-279583434a8d.png",
    options: [],
  },
  {
    name: "AC Uninstall Service",
    id: "ac-uninstall-service",
    price: 2150,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/65ac968a-92f0-4108-b117-251fcbc9257d.png",
    options: [],
  },
  {
    name: "Refrigerator Gas Re-charge",
    id: "refrigerator-gas-re-charge",
    price: 1699,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/e564d201-99e7-477c-bdbf-65489e0021b4.png",
    options: [],
  },
  {
    name: "Refrigerator General Servicing",
    id: "refrigerator-general-servicing",
    price: 500,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/a286981b-e60f-47c3-8488-3fc971d27fca.png",
    options: [],
  },
  {
    name: "Geyser Installation",
    id: "geyser-installation",
    price: 1440,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/a94a9fba-39d4-45f8-9d26-d8f536998e8f.png",
    options: [],
  },
  {
    name: "Geyser Re-installation",
    id: "geyser-re-installation",
    price: 1799,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/0c3e6498-1839-4e7f-b274-0a886d6f5c26.png",
    options: [],
  },
  {
    name: "Geyser General Servicing",
    id: "geyser-servicing",
    price: 599,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/035021fc-5860-459f-a3cf-719199af0763.png",
    options: [],
  },
  {
    name: "Geyser Uninstallation",
    id: "geyser-uninstallation",
    price: 999,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/4d5bab57-b116-4cd4-b21c-c92609eca055.png",
    options: [],
  },
  {
    name: "Oven Display Switch Change",
    id: "oven-display-switch-change",
    price: 1500,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/1e996d47-34ad-476e-82af-64ae43a1fe6e.png",
    options: [],
  },
  {
    name: "Oven General Servicing",
    id: "oven-general-servicing",
    price: 480,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/4cec195e-d429-44ce-ad66-7d948d54047e.png",
    options: [],
  },
  {
    name: "TV General Servicing",
    id: "tv-general-servicing",
    price: 480,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/c6059af6-d4a0-4bc3-972c-5065fe36c48b.png",
    options: [],
  },
  {
    name: "TV Panel Replacement",
    id: "tv-panel-replacement",
    price: 1200,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/17538a6a-5f80-406c-9e64-e6b87da2ef95.png",
    options: [],
  },
  {
    name: "Washing Machine General Servicing",
    id: "washing-machine-general-servicing",
    price: 600,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/3855f482-d151-4525-8bf9-827fc29abd02.png",
    options: [],
  },
  {
    name: "Washing Machine Install",
    id: "washing-machine-install",
    price: 500,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/812b7071-bed0-4f6f-bea2-e9e2dd098712.png",
    options: [],
  },
  {
    name: "Washing Machine Re-install",
    id: "washing-machine-re-install",
    price: 720,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/1b8f1964-bf5f-4b4e-8713-8f5f7a1a1b83.png",
    options: [],
  },
  {
    name: "Washing Machine Uninstall",
    id: "washing-machine-uninstall",
    price: 480,
    category: ["electrics"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/89568185-5da4-47d0-a094-34aa56cdf77d.png",
    options: [],
  },
  {
    name: "Bachelor Home Shifting Service",
    id: "bachelor-home-shifting-service",
    price: 2999,
    category: ["shifting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/479cdbcf-845d-40ea-bcfc-b620ca9a1c6a.png",
    options: [],
  },
  {
    name: "Couple Shifting",
    id: "couple-shifting",
    price: 4999,
    category: ["shifting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/77d2484e-a66b-40b0-8017-4d62c9776143.png",
    options: [],
  },
  {
    name: "Family Mini Shifting",
    id: "family-mini-shifting",
    price: 7999,
    category: ["shifting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/ed8258f6-dd2d-45ac-abba-aa6ce8e6bcd8.png",
    options: [],
  },
  {
    name: "Family Super Shifting Service",
    id: "family-super-shifting-service",
    price: 9999,
    category: ["shifting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/1c83f6ee-9a32-4a19-85f7-5a0fa7d225aa.png",
    options: [],
  },
  {
    name: "Home Shifting Inspection",
    id: "home-shifting-inspection",
    price: 0,
    category: ["shifting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/44a4fa5e-34f9-473a-95ef-cc47a8c40c32.png",
    options: [],
  },
  {
    name: "Office Shifting Inspection",
    id: "office-shifting-inspection",
    price: 0,
    category: ["shifting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/3754935c-10b6-4ec9-b081-d80acf8060d2.png",
    options: [],
  },
  {
    name: "Exterior Painting Service",
    id: "exterior-painting-service",
    price: 2000,
    category: ["painting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/d0b67274-ae12-4a97-b07b-27fb6a30cc54.jpeg",
    options: [],
  },
  {
    name: "Exterior Painting | Weather Coat",
    id: "exterior-painting-weather-coat",
    price: 4000,
    category: ["painting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/745e8e8b-5514-4808-941f-d04eb11053f4.jpeg",
    options: [],
  },
  {
    name: "Interior Painting Service",
    id: "interior-painting-service",
    price: 2000,
    category: ["painting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/6320bcdc-42db-4d66-819a-97a82f7710e1.jpeg",
    options: [],
  },
  {
    name: "Interior Painting | Distemper Paint",
    id: "interior-painting-distemper-paint",
    price: 4200,
    category: ["painting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/6c27f8d5-4407-4cf2-a6d1-7fe9f13c2050.jpeg",
    options: [],
  },
  {
    name: "Interior Painting | Luxury Paint",
    id: "interior-painting-luxury-paint",
    price: 6500,
    category: ["painting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/1dfc4da5-14bf-4f3f-a09d-ece0947dd97d.jpeg",
    options: [],
  },
  {
    name: "Interior Painting | Plastic Paint",
    id: "interior-painting-plastic-paint",
    price: 4400,
    category: ["painting"],
    imageSrc:
      "https://hm-image-storage.s3.ap-southeast-1.amazonaws.com/4699f676-53d9-4dcb-9c12-eb43fca8487d.jpeg",
    options: [],
  },
  {
    name: "Kitchen Hood Repair",
    id: "kitchen-hood-repair",
    price: 250,
    category: ["households"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/kitchen.jpg",
    options: [],
  },
  {
    name: "Oven Repair",
    id: "oven-repair",
    price: 0,
    category: ["electrics"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/Oven.png",
    options: [],
  },
  {
    name: "Washroom Cleaning",
    id: "washroom-cleaning",
    price: 799,
    category: ["cleaning"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/Washroom.png",
    options: [],
  },
  {
    name: "Chiller Refrigerator Repairing & Servicing",
    id: "chiller-refrigerator-repairing-servicing",
    price: 4650,
    category: ["electrics"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/Refre.png",
    options: [],
  },
  {
    name: "Deep Refrigerator Repairing & Servicing",
    id: "deep-refrigerator-repairing-servicing",
    price: 7200,
    category: ["electrics"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/Ref.png",
    options: [],
  },
  {
    name: "Property Management Service (HandyMan)",
    id: "property-management-service-handyman",
    price: 0,
    category: ["households"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/town.png",
    options: [],
  },
  {
    name: "TV Wall Mount Installation",
    id: "tv-wall-mount-installation",
    price: 500,
    category: ["households"],
    imageSrc: "https://handy-mama-media.s3.amazonaws.com/product/images/TV.png",
    options: [],
  },
  {
    name: "Office Shifting Service",
    id: "office-shifting-service",
    price: 9999,
    category: ["shifting"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/Office.png",
    options: [],
  },
  {
    name: "CCTV Repair Service",
    id: "cctv-repair-service",
    price: 500,
    category: ["electrics"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/cctv-camera.png",
    options: [],
  },
  {
    name: "Staircase Cleaning",
    id: "staircase-cleaning",
    price: 0,
    category: ["cleaning"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/Staircase.png",
    options: [],
  },
  {
    name: "General Pest Control Service",
    id: "general-pest-control-service",
    price: 0,
    category: ["bug-control"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/Pest.png",
    options: [],
  },
  {
    name: "AC Water Jet Service",
    id: "ac-waterjet-service",
    price: 999,
    category: ["electrics"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/AC-Waterjet.png",
    options: [],
  },
  {
    name: "AC Bundle Offer",
    id: "ac-bundle-offer-1-general-1-waterjet-service",
    price: 1299,
    category: ["electrics"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/air-conditioning.jpg",
    options: [],
  },
  {
    name: "Kitchen & Washroom Combo",
    id: "kitchen-washroom-combo",
    price: 1600,
    category: ["households"],
    imageSrc: null,
    options: [],
  },
  {
    name: "Monthly Cleaning Subscription",
    id: "monthly-cleaning-subscription",
    price: 5999,
    category: ["cleaning"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/MCS.png",
    options: [],
  },
  {
    name: "AC Hydro Clean Service",
    id: "ac-hydro-clean-with-free-cover",
    price: 999,
    category: ["cleaning"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/AC-Waterjet.png",
    options: [],
  },
  {
    name: "AC Combo Offer (Master & General Services)",
    id: "ac-combo-offer-master-general-services",
    price: 1499,
    category: ["electrics"],
    imageSrc:
      "https://handy-mama-media.s3.amazonaws.com/product/images/AC-Waterjet.png",
    options: [],
  },
];

export default services;
