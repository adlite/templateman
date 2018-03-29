import uniq from 'lodash.uniq';

const Parser = {
	regVarname: /\${TM_([\D][A-Z0-9_]+)}/gm,
	regVarnameOnce: /\${TM_([\D][A-Z0-9_]+)}/,

	getVars: (data) => {
		let res;
		let vars = [];
		while ((res = Parser.regVarname.exec(data))) {
			vars.push(res[1]);
		}
		return uniq(vars);
	},
};

export default Parser;
