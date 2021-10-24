import uniq from 'lodash.uniq';
import caser from 'caesar-caser';

const Parser = {
  regExpVarName: /\${TM:([A-Z0-9_]+):?([A-Z0-9_]+)?}/gm,
  regExpVarNameOnce: /\${TM:([A-Z0-9_]+):?([A-Z0-9_]+)?}/,

  transformers: {
    CAMEL_CASE: val => caser(val).convertTo('camel'),
    PASCAL_CASE: val => caser(val).convertTo('pascal'),
    KEBAB_CASE: val => caser(val).convertTo('kebab'),
    TRAIN_CASE: val => caser(val).convertTo('train'),
    SNAKE_CASE: val => caser(val).convertTo('snake'),
    CONSTANT_CASE: val => caser(val).convertTo('constant'),
    DOT_CASE: val => caser(val).convertTo('dot'),
    UPPER_DOT_CASE: val => caser(val).convertTo('upper-dot'),
    SENTENCE_CASE: val => caser(val).convertTo('sentence'),
    CAP_SENTENCE_CASE: val => caser(val).convertTo('cap-sentence'),
    UPPER_SENTENCE_CASE: val => caser(val).convertTo('upper-sentence'),
    LOWER_SENTENCE_CASE: val => caser(val).convertTo('lower-sentence'),
  },

  getVars: data => {
    let res;
    let vars = [];
    while ((res = Parser.regExpVarName.exec(data))) {
      const [match, varName] = res;
      vars.push(varName);
    }
    return uniq(vars);
  },

  replaceVars: (data, values) => {
    return data.replace(Parser.regExpVarName, foundStr => {
      const [match, varName, transformerName] = foundStr.match(Parser.regExpVarNameOnce);
      const transformer = Parser.transformers[transformerName];

      if (typeof transformer === 'function') {
        return transformer(values[varName]);
      } else {
        return values[varName];
      }
    });
  },
};

export default Parser;
