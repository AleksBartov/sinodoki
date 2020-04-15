import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

const { set, concat, divide, Value, event, block, eq, cond, call, add, clockRunning, stopClock, startClock, debug, spring, Clock, modulo, timing, sub, lessThan, multiply } = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 500,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

const SIZE = Dimensions.get('window').width / 2;
const STEP = SIZE * 1.2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        position: 'absolute',
        top: '98%',
        left: '50%',
        overflow: 'hidden',
    },
    years: {
        marginLeft: -(SIZE + (STEP * 3)) / 2,
        marginTop: -(SIZE + (STEP * 3)) / 2,
        width: SIZE + (STEP * 3),
        height: SIZE + (STEP * 3),
        borderRadius: (SIZE + (STEP * 3)) / 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    months: {
        marginLeft: -(SIZE + (STEP * 2)) / 2,
        marginTop: -(SIZE + (STEP * 2)) / 2,
        width: SIZE + (STEP * 2),
        height: SIZE + (STEP * 2),
        borderRadius: (SIZE + (STEP * 2)) / 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    days: {
        marginLeft: -(SIZE + STEP) / 2,
        marginTop: -(SIZE + STEP) / 2,
        width: SIZE + STEP,
        height: SIZE + STEP,
        borderRadius: (SIZE + STEP) / 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    button: {
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        paddingTop: SIZE / 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    item: {
        width: STEP / 2,
        height: STEP / 2,
        position: 'absolute',
        left: '50%',
        marginLeft: -STEP / 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default class Circules extends React.Component {
    constructor(props) {
        super(props)
        const yearsClock = new Clock();
        const monthsClock = new Clock();
        const daysClock = new Clock();
        const yearsLength = 18;
        const monthsLength = 12;
        const daysLength = 15;
        this.state = {
            allYears: new Array(yearsLength).fill(null).map((_, i) => {
                return i + 1983
            }),
            yearsDivider: 4,
            yearsAngle: 360 / yearsLength,
            monthsDivider: 4,
            monthsAngle: 360 / monthsLength,
            daysDivider: 2,
            daysAngle: 360 / daysLength,
            allMonths: [
                'январь',
                'февраль',
                'март',
                'апрель',
                'май',
                'июнь',
                'июль',
                'август',
                'сентябрь',
                'октябрь',
                'ноябрь',
                'декабрь',
            ],
            allDays: new Array(daysLength).fill(null).map((_, i) => {
                return i + 1
            }),
        }

        this.dragYearsX = new Value(0);
        this.offsetYearsX = new Value(0);
        this.yearsGestureState = new Value(-1);
        this.onYearsGestureEvent = event([
            {
                nativeEvent: {
                    translationX: this.dragYearsX,
                    state: this.yearsGestureState,
                },
            },
        ]);
        this.yearsAddX = add(this.offsetYearsX, this.dragYearsX);
        this.myYearsRot = cond(
            eq(this.yearsGestureState, State.ACTIVE),
            this.yearsAddX,
            cond(
                eq(this.yearsGestureState, State.END), set(this.offsetYearsX, runTiming(yearsClock, this.yearsAddX, cond(lessThan(modulo(this.yearsAddX, multiply(this.state.yearsAngle, this.state.yearsDivider)), 40), sub(this.yearsAddX, modulo(this.yearsAddX, multiply(this.state.yearsAngle, this.state.yearsDivider))), add(this.yearsAddX, sub(multiply(this.state.yearsAngle, this.state.yearsDivider), modulo(this.yearsAddX, multiply(this.state.yearsAngle, this.state.yearsDivider))))))))
        );

        // ------------------------------------------------------------

        this.dragMonthsX = new Value(0);
        this.offsetMonthsX = new Value(0);
        this.monthsGestureState = new Value(-1);
        this.onMonthsGestureEvent = event([
            {
                nativeEvent: {
                    translationX: this.dragMonthsX,
                    state: this.monthsGestureState,
                },
            },
        ]);
        this.monthsAddX = add(this.offsetMonthsX, this.dragMonthsX);
        this.myMonthsRot = cond(
            eq(this.monthsGestureState, State.ACTIVE),
            this.monthsAddX,
            cond(
                eq(this.monthsGestureState, State.END), set(this.offsetMonthsX, runTiming(monthsClock, this.monthsAddX, cond(lessThan(modulo(this.monthsAddX, multiply(this.state.monthsAngle, this.state.monthsDivider)), 60), sub(this.monthsAddX, modulo(this.monthsAddX, multiply(this.state.monthsAngle, this.state.monthsDivider))), add(this.monthsAddX, sub(multiply(this.state.monthsAngle, this.state.monthsDivider), modulo(this.monthsAddX, multiply(this.state.monthsAngle, this.state.monthsDivider))))))))
        );

        //--------------------------------------------------------------------

        this.dragDaysX = new Value(0);
        this.offsetDaysX = new Value(0);
        this.daysGestureState = new Value(-1);
        this.onDaysGestureEvent = event([
            {
                nativeEvent: {
                    translationX: this.dragDaysX,
                    state: this.daysGestureState,
                },
            },
        ]);
        this.daysAddX = add(this.offsetDaysX, this.dragDaysX);
        this.myDaysRot = cond(
            eq(this.daysGestureState, State.ACTIVE),
            this.daysAddX,
            cond(
                eq(this.daysGestureState, State.END), set(this.offsetDaysX, runTiming(daysClock, this.daysAddX, cond(lessThan(modulo(this.daysAddX, multiply(this.state.daysAngle, this.state.daysDivider)), 40), sub(this.daysAddX, modulo(this.daysAddX, multiply(this.state.daysAngle, this.state.daysDivider))), add(this.daysAddX, sub(multiply(this.state.daysAngle, this.state.daysDivider), modulo(this.daysAddX, multiply(this.state.daysAngle, this.state.daysDivider))))))))
        );

    }

    render() {

        const { allYears,
            allMonths,
            allDays,
            yearsAngle,
            yearsDivider,
            monthsAngle,
            monthsDivider,
            daysAngle,
            daysDivider
        } = this.state;
        return (
            <View
                style={styles.container}
            >
                <PanGestureHandler
                    maxPointers={1}
                    minDist={10}
                    onGestureEvent={this.onYearsGestureEvent}
                    onHandlerStateChange={this.onYearsGestureEvent}
                >
                    <Animated.View style={{ width: 1000, height: STEP / 2, zIndex: 100, position: 'absolute', top: STEP / 4 }}>
                    </Animated.View>
                </PanGestureHandler>
                <Animated.View style={[styles.years, styles.circle, { transform: [{ rotate: concat(divide(this.myYearsRot, yearsDivider), 'deg') }] }]}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: SIZE * 4,
                        }}
                    />
                    {
                        allYears.map((year, i) => {
                            const angle = i * yearsAngle;
                            return (
                                <View style={[styles.item,
                                { transform: [{ translateY: (((SIZE + (STEP * 3)) / 2) - (STEP / 4)) }, { rotate: `${angle}deg` }, { translateY: -(((SIZE + (STEP * 3)) / 2) - (STEP / 4)) }] }
                                ]}
                                >
                                    <Text style={{ fontSize: 30 }}>{year}</Text>
                                </View>
                            )
                        })
                    }
                </Animated.View>
                <PanGestureHandler
                    maxPointers={1}
                    minDist={10}
                    onGestureEvent={this.onMonthsGestureEvent}
                    onHandlerStateChange={this.onMonthsGestureEvent}
                >
                    <Animated.View style={{ width: 1000, height: STEP / 2, zIndex: 100, position: 'absolute', top: (STEP / 4) + (STEP / 2) }}>
                    </Animated.View>
                </PanGestureHandler>
                <Animated.View style={[styles.months, styles.circle, { transform: [{ rotate: concat(divide(this.myMonthsRot, monthsDivider), 'deg') }] }]}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: SIZE * 3,
                        }}
                    />
                    {
                        allMonths.map((month, i) => {
                            const angle = i * monthsAngle;
                            return (
                                <View style={[styles.item,
                                { transform: [{ translateY: (((SIZE + (STEP * 2)) / 2) - (STEP / 4)) }, { rotate: `${angle}deg` }, { translateY: -(((SIZE + (STEP * 2)) / 2) - (STEP / 4)) }] }
                                ]}
                                >
                                    <Text style={{ fontSize: 22 }}>{month}</Text>
                                </View>
                            )
                        })
                    }
                </Animated.View>
                <PanGestureHandler
                    maxPointers={1}
                    minDist={10}
                    onGestureEvent={this.onDaysGestureEvent}
                    onHandlerStateChange={this.onDaysGestureEvent}
                >
                    <Animated.View style={{ width: 1000, height: STEP / 2, zIndex: 100, position: 'absolute', top: (STEP / 4) + (STEP) }}>
                    </Animated.View>
                </PanGestureHandler>
                <Animated.View style={[styles.days, styles.circle, { transform: [{ rotate: concat(divide(this.myDaysRot, daysDivider), 'deg') }] }]}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: SIZE * 2,
                        }}
                    />
                    {
                        allDays.map((day, i) => {
                            const angle = i * daysAngle;
                            return (
                                <View style={[styles.item,
                                { transform: [{ translateY: (((SIZE + (STEP * 1)) / 2) - (STEP / 4)) }, { rotateZ: `${angle}deg` }, { translateY: -(((SIZE + (STEP * 1)) / 2) - (STEP / 4)) }] }
                                ]}
                                >
                                    <Text style={{ fontSize: 30 }}>{day}</Text>
                                </View>
                            )
                        })
                    }
                </Animated.View>
                <TouchableOpacity style={[styles.button, styles.circle]} onPress={() => this.props.setModal(false)}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: SIZE,
                        }}
                    />
                    <Text style={{ color: '#ffffff', fontSize: 36 }}>OK</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

