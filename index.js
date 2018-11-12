/**
 * Created by Riven on 2018/11/12
 */
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;


const acceleCommon = gen => {
    gen.includes_['accele'] = '#include <AccelStepper.h>';
};


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
                gen: {
                    arduino: this.stepper4
                }
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
                gen: {
                    arduino: this.stepper2
                }
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
                gen: {
                    arduino: this.setmaxspeed
                }
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
                gen: {
                    arduino: this.moveto
                }
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
                gen: {
                    arduino: this.move
                }
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
                gen: {
                    arduino: this.run
                }
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
                gen: {
                    arduino: this.runtonewpos
                }
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
    
    stepper4 (gen, block){
        acceleCommon(gen);
        const stp = gen.parentVarDef(block);
        const pin1 = gen.valueToCode(block, 'PIN1');
        const pin2 = gen.valueToCode(block, 'PIN2');
        const pin3 = gen.valueToCode(block, 'PIN3');
        const pin4 = gen.valueToCode(block, 'PIN4');
        gen.definitions_[`astep_${stp}`] = `AccelStepper astep_${stp}(4, ${pin1}, ${pin2}, ${pin3}, ${pin4});`;
    }

    stepper2 (gen, block){
        acceleCommon(gen);
        const stp = gen.parentVarDef(block);
        const pin1 = gen.valueToCode(block, 'PIN1');
        const pin2 = gen.valueToCode(block, 'PIN2');
        gen.definitions_[`astep_${stp}`] = `AccelStepper astep_${stp}(2, ${pin1}, ${pin2});`;
    }
    
    setmaxspeed (gen, block){
        acceleCommon(gen);
        const stepper = gen.valueToCode(block, 'STEPPER');
        const spd = gen.valueToCode(block, 'SPD');
        const code = `astep_${stepper}.setMaxSpeed(${spd})`
        return code;
    }
    
    moveto (gen, block){
        acceleCommon(gen);
        const stepper = gen.valueToCode(block, 'STEPPER');
        const pos = gen.valueToCode(block, 'POS');
        const code = `astep_${stepper}.moveTo(${pos})`
        return code;
    }
    
    move (gen, block){
        acceleCommon(gen);
        const stepper = gen.valueToCode(block, 'STEPPER');
        const pos = gen.valueToCode(block, 'POS');
        const code = `astep_${stepper}.move(${pos})`
        return code;
    }
    
    run (gen, block){
        acceleCommon(gen);
        const stepper = gen.valueToCode(block, 'STEPPER');
        const code = `astep_${stepper}.run()`
        return code;
    }
    
    runtonewpos (gen, block){
        acceleCommon(gen);
        const stepper = gen.valueToCode(block, 'STEPPER');
        const pos = gen.valueToCode(block, 'POS');
        const code = `astep_${stepper}.runToNewPosition(${pos})`
        return code;
    }
}

module.exports = AcceleStepper;
