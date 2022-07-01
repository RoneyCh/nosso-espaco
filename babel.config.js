module.exports = {
    presets: ['@babel/preset-typescript',
       ['next/babel', {
          targets: { esmodules: false, node: "current" }
       }],
       '@babel/preset-flow',
     
    ],
    
 }