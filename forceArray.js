const LINE = '─────────────────────────────────────────────────────────────────────────────────';
const forceArray = data => Array.isArray(data) ? data : [data];
function getIn(object, keyPath, def) { // NOTE default is a reserved word
	let p = 0;
	const ourKeyPath = keyPath.split ? keyPath.split('.') : keyPath;
	let ourObjectRef = object;
	while (ourObjectRef && p < ourKeyPath.length) {
		ourObjectRef = ourObjectRef[ourKeyPath[p]];
		p += 1;
	}
	return ourObjectRef === undefined ? def : ourObjectRef;
}

const node = {
  objectArray: [{
    emptyArray: [],
    singleArray: ['single'],
    pair: ['a', 'b'],
    matrix: [
      ['00', '01'],
    ]
  }]
};


const enonic = {
  objectArray: {
    singleArray: 'single',
    pair: ['a', 'b'],
    matrix: ['00', '01'] // Guessing untested
  }
};


function testEnonic() {
  const emptyArray = typeof forceArray(enonic.objectArray)[0].emptyArray !== 'undefined'
		? forceArray(enonic.objectArray)[0].emptyArray
		: [];
  const singleArray = forceArray(forceArray(enonic.objectArray)[0].singleArray);
	const pair = forceArray(forceArray(enonic.objectArray)[0].pair);
	const matrix = Array.isArray(
		forceArray(enonic.objectArray)[0].matrix[0]
	)
		? forceArray(enonic.objectArray)[0].matrix
		: forceArray(forceArray(enonic.objectArray)[0].matrix); // Force Array Fails!
	console.log({emptyArray, singleArray, pair, matrix});
}


function testVanilla() {
  const emptyArray = node.objectArray[0].emptyArray;
  const singleArray = node.objectArray[0].singleArray;
	const pair = node.objectArray[0].pair;
	const matrix = node.objectArray[0].matrix;
  console.log({emptyArray, singleArray, pair, matrix});
}


function testNode() {
  const [{emptyArray, singleArray, pair, matrix}] = node.objectArray;
  console.log({emptyArray, singleArray, pair, matrix});
}


console.log(`${LINE}\n Enonic\n${LINE}`);
testEnonic();

console.log(`${LINE}\n Vanilla JS\n${LINE}`);
testVanilla();

console.log(`${LINE}\n Node\n${LINE}`);
testNode();
