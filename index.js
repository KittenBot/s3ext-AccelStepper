/**
 * Created by Riven on 2018/11/12
 */
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

class AcceleStepper {
    constructor (runtime){
        this.runtime = runtime;
    }

    _buildMenu (info) {
        return info.map((entry, index) => {
            const obj = {};
            obj.text = entry.name;
            obj.value = String(index + 1);
            return obj;
        });
    }

    getInfo (){
        return {
            id: 'AcceleStepper',
            name: 'AcceleStepper',

            blocks: [
            {
                opcode: 'stepper4',
                blockType: Scratch.BlockType.REPORTER,
                text: 'Stepper4 [PIN1] [PIN2] [PIN3] [PIN4]',
                arguments: {
                    PIN1: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: '5',
                    },
                    PIN2: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: '9',
                    },
                    PIN3: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: '6',
                    },
                    PIN4: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: '10',
                    }
                },
                func: 'noop',
            },
            {
                opcode: 'stepper2',
                blockType: Scratch.BlockType.REPORTER,
                text: 'Stepper2 [PIN1] [PIN2]',
                arguments: {
                    PIN1: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: '2',
                    },
                    PIN2: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: '3',
                    }
                },
                func: 'noop',
            },
            '---',
            {
                opcode: 'setmaxspeed',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Stepper [STEPPER] max speed [SPD]',
                arguments: {
                    STEPPER: {
                        type: Scratch.ArgumentType.STRING
                    },
                    SPD: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 400,
                    }
                },
                func: 'noop',
            },
            {
                opcode: 'moveto',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Stepper [STEPPER] move to [POS]',
                arguments: {
                    STEPPER: {
                        type: Scratch.ArgumentType.STRING
                    },
                    POS: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 1500,
                    }
                },
                func: 'noop',
            },
            {
                opcode: 'move',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Stepper [STEPPER] move [POS]',
                arguments: {
                    STEPPER: {
                        type: Scratch.ArgumentType.STRING
                    },
                    POS: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 60,
                    }
                },
                func: 'noop',
            },
            {
                opcode: 'run',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Stepper [STEPPER] run',
                arguments: {
                    STEPPER: {
                        type: Scratch.ArgumentType.STRING
                    }
                },
                func: 'noop',
            },
            '---',
            {
                opcode: 'runtonewpos',
                blockType: Scratch.BlockType.COMMAND,
                text: 'Stepper [STEPPER] block run to new pos [POS]',
                arguments: {
                    STEPPER: {
                        type: Scratch.ArgumentType.STRING
                    },
                    POS: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 1500,
                    }
                },
                func: 'noop',
            },
            ],
            translation_map: {
                'zh-cn': {
                    setmaxspeed: 'Stepper [STEPPER] 最大速度 [SPD]',
                    moveto: 'Stepper [STEPPER] 移动到 [POS]',
                    move: 'Stepper [STEPPER] 移动 [POS]',
                    run: 'Stepper [STEPPER] 运行',
                    runtonewpos: 'Stepper [STEPPER] 阻断 运行到新位置 [POS]'
                }
            }
        };
    }

    noop (){

    }

}

module.exports = AcceleStepper;
