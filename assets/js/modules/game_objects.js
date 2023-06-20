// This function calculates the room index based on the object's position in the scene
function getRoomIndex(objectName, scene) {
  // Get the object from the scene's object handler
  let object = scene.objectHandler.getObject(objectName);
  // Calculate the x and y coordinates of the object in the grid
  let x = Math.floor(object.x / scene.gridSize);
  let y = Math.floor(object.y / scene.gridSize);
  // Calculate the room coordinates based on the object's position
  let roomX = Math.floor(x / 10); // assuming each room is 10 tiles wide
  let roomY = Math.floor(y / 10); // assuming each room is 10 tiles high
  // Create a string that uniquely identifies the room
  return `room_${roomX}_${roomY}`;
}

// OBJECT HANDLER FOR EASIER HANDLING OF MULTIPLE SPRITES
class ObjectHandler {

	constructor(scene) {
		this.objects = {};
		this.scene = scene;
	}

	getObject(name) { return this.objects[name]; }
    update() { Object.keys(this.objects).forEach((element) => { this.objects[element].update(); }); }
    
	addObject(object, name) {
		object.setData("name", name);
		this.objects[name] = object;
	}

	removeObject(name) {
		this.objects[name].destroy();
		delete this.objects[name];
	}

	getAllEnemies(callback=(key) => {}) {
		let tArray = []
		Object.keys(this.objects).forEach((key) => {
			if (["goblin", "skeleton", "orc"].includes(this.objects[key].texture.key)) {
				tArray.push(key);
				callback(key)
			}
		});
		return tArray;
	}

	runForEnemiesInRoom(roomIndex, callback=(key) => {}) {
		Object.keys(this.objects).forEach((key) => {
			if (getRoomIndex(key, this.scene) == roomIndex) {
				console.log(key)
				if (["goblin", "skeleton", "orc"].includes(this.objects[key].texture.key)) {
					callback(key)
				}
			}
		})
	}

	getEnemiesInRoom(roomIndex, callback=(key) => {}) {
		let tArray = []
		Object.keys(this.objects).forEach((key) => {
			if (getRoomIndex(key, this.scene) == roomIndex) {
				if (["goblin", "skeleton", "orc"].includes(this.objects[key].texture.key)) {
					tArray.push(key);
					callback(key)
				}
			}
		})
		return tArray
	}

}

class GameObject {
	constructor(pos, sprite, name, scene) {
		this.object = scene.physics.add.sprite(pos[0], pos[1], sprite)
		scene.objectHandler.addObject(
			this.object,
			name
		);
		return this.object;
	}
}



// Export the getRoomIndex function for external use
export { getRoomIndex };

export {
    getRoomIndex, GameObject, ObjectHandler
}