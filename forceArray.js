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
    pair: ['first', 'second'],
    matrix: [
      ['a', 'b'],
    ]
  }]
};


const enonic = {
  objectArray: { // objectArray has become object
		// emptyArray don't exist
    singleArray: 'single', // singleArray has become string
    pair: ['first', 'second'],
    matrix: ['a', 'b'] // Matrix has become Array. (Guessing untested)
  }
};


function testEnonic() {
  const emptyArray = typeof forceArray(enonic.objectArray)[0].emptyArray !== 'undefined'
		? forceArray(enonic.objectArray)[0].emptyArray
		: [];
  const singleArray = forceArray(forceArray(enonic.objectArray)[0].singleArray);
	const pair = forceArray(forceArray(enonic.objectArray)[0].pair);
	const first = forceArray(forceArray(enonic.objectArray)[0].pair)[0];
	const second = forceArray(forceArray(enonic.objectArray)[0].pair)[1];
	const matrix = Array.isArray(
		forceArray(enonic.objectArray)[0].matrix[0]
	)
		? forceArray(enonic.objectArray)[0].matrix
		: forceArray(forceArray(enonic.objectArray)[0].matrix); // Force Array Fails!
	console.log({emptyArray, singleArray, pair, matrix, first, second});
}


function testVanilla() {
  const emptyArray = node.objectArray[0].emptyArray;
  const singleArray = node.objectArray[0].singleArray;
	const pair = node.objectArray[0].pair;
	const first = node.objectArray[0].pair[0];
	const second = node.objectArray[0].pair[1];
	const matrix = node.objectArray[0].matrix;
  console.log({emptyArray, singleArray, pair, matrix, first, second});
}


function testNode() {
  const [{
		emptyArray,
		singleArray,
		pair,
		pair: [first, second],
		matrix,
		matrix: [row],
		matrix: [[a,b]]
	}] = node.objectArray;
  console.log({emptyArray, singleArray, pair, matrix, first, second, row, a, b});
}


console.log(`${LINE}\n Enonic\n${LINE}`);
testEnonic();

console.log(`${LINE}\n Vanilla JS\n${LINE}`);
testVanilla();

console.log(`${LINE}\n Node\n${LINE}`);
testNode();
