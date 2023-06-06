import { Image, Stack, Stat, Table } from '@fjlaubscher/matter';

// components
import BackButton from '../../components/button/back';
import Card from '../../components/card';
import ContentsModal from '../../components/contents-modal';
import Damage from '../../components/rules/damage';
import Hit from '../../components/rules/hit';
import Layout from '../../components/layout';
import Section from '../../components/section';
import Weapons from '../../components/rules/weapons';

// helpers
import useCore from '../../data/use-core';
import { formatDate } from '../../helpers/date';

import styles from './rules.module.scss';

const CONTENTS = {
  'The Turn': [{ text: 'Overview', href: '#turn-sequence' }],
  Orders: [
    {
      text: 'Overview',
      href: '#orders'
    },
    {
      text: 'FUBAR!',
      href: '#orders-fubar'
    },
    {
      text: 'Troop Quality and Morale',
      href: '#orders-morale'
    },
    {
      text: 'Officer Bonuses',
      href: '#orders-officers'
    }
  ],
  Movement: [
    {
      text: 'Overview',
      href: '#movement'
    },
    {
      text: 'Terrain',
      href: '#movement-terrain'
    },
    {
      text: 'Vehicle Manoeuvre',
      href: '#movement-vehicles'
    },
    {
      text: 'Reverse Moves',
      href: '#movement-reverse'
    }
  ],
  Shooting: [
    { text: 'Overview', href: '#shooting' },
    {
      text: 'Hit Modifiers',
      href: '#hit-modifiers'
    },
    {
      text: 'Damage Value',
      href: '#damage-value'
    },
    {
      text: 'Weapons',
      href: '#weapons'
    },
    {
      text: 'HE Shots',
      href: '#he-shots'
    },
    {
      text: 'Shooting at Vehicles',
      href: '#shooting-vehicles'
    },
    {
      text: 'Damage Results on Vehicles',
      href: '#vehicle-damage-results'
    }
  ],
  'Close Quarters': [{ text: 'Overview', href: '#close-quarters' }],
  Buildings: [{ text: 'Overview', href: '#buildings' }]
};

const QuickReferenceRules = () => {
  const { data, loading } = useCore();

  return (
    <Layout
      title="Core Rules"
      description="View the core rules of Bolt Action 2nd edition."
      isLoading={loading}
    >
      {data && (
        <Stack direction="column">
          <ContentsModal items={CONTENTS} />
          <div className={styles.hero}>
            <Stack direction="column">
              <Stat
                title="Barracks"
                value="Core Rules"
                description={`Last updated: ${formatDate(data?.lastUpdated)}`}
              />
              <BackButton to="/rules" />
            </Stack>
            <Image
              className={styles.book}
              src="/images/bolt-action.jpg"
              alt="Bolt Action 2nd Edition"
            />
          </div>
          <Section id="turn-sequence" title="Rules" description="The Turn">
            <ol className={styles.list}>
              <li>
                Orders phase
                <ol>
                  <li>
                    Draw an order die from the dice cup and hand it to the appropriate player.
                  </li>
                  <li>
                    The player chooses one of his units and gives it an order. Place the order die
                    next to the unit to show that it has received an order. Once a unit has been
                    given an order it cannot be given another order that turn.
                  </li>
                  <li>
                    If necessary, the player takes an order test to determine if the unit follows
                    the order.
                  </li>
                  <li>The player executes the unit's resulting action.</li>
                  <li>
                    Back to 1. Once all eligible units have received an order, the orders phase ends
                    - move to the turn end phase.
                  </li>
                </ol>
              </li>
              <li>
                Turn End phase
                <ul>
                  <li>
                    Remove order dice for destroyed units. Return remaining order dice to the cup,
                    except for those units retaining an <i>Ambush</i> or <i>Down</i> order.
                  </li>
                </ul>
              </li>
            </ol>
          </Section>
          <Section id="orders" title="Rules" description="Orders">
            <Table
              headings={[
                { text: '#' },
                { text: 'Order' },
                { text: 'Summary of Action', className: styles.noWrap }
              ]}
            >
              <tr>
                <td>1</td>
                <td className={styles.italics}>Fire</td>
                <td className={styles.stretch}>Fire at full effect without moving</td>
              </tr>
              <tr>
                <td>2</td>
                <td className={styles.italics}>Advance</td>
                <td className={styles.stretch}>Move and then fire</td>
              </tr>
              <tr>
                <td>3</td>
                <td className={styles.italics}>Run</td>
                <td className={styles.stretch}>
                  Move at double speed without firing. Also used for assaulting
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td className={styles.italics}>Ambush</td>
                <td className={styles.stretch}>No move/fire, but wait for opportunity fire</td>
              </tr>
              <tr>
                <td>5</td>
                <td className={styles.italics}>Rally</td>
                <td className={styles.stretch}>No move/fire, but lose D6 pin markers</td>
              </tr>
              <tr>
                <td>6</td>
                <td className={styles.italics}>Down</td>
                <td className={styles.stretch}>No move/fire, but gain an extra -2 to be hit</td>
              </tr>
            </Table>
            <Card id="orders-fubar" title="FUBAR!">
              <p>
                If an order test roll comes up two sixes then not only is the order not given but
                the player must immediately roll on the chart below. Roll a die to find what action
                the unit takes.
              </p>
              <Table headings={[{ text: 'Result' }, { text: 'Description' }]}>
                <tr>
                  <td>1 - 2</td>
                  <td>
                    <strong>Friendly Fire</strong>
                    <br />
                    <p>
                      The unit does not move and opens fire against a friendly unit, mistaking it
                      for enemy. Place a <i>fire</i> order by the unit. The opposing player chooses
                      the target. The target must have an enemy unit within 12", as proximity to
                      enemy is precisely what has caused the 'friendly fire incident'. If no such
                      target is available the unit does not fire and goes <i>down</i> instead.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>3 - 6</td>
                  <td>
                    <strong>Panic</strong>
                    <br />
                    <p>
                      The unit executes a <i>run</i> order and must move as fast as possible away
                      from the closest visible enemy unit. If no enemy are visible the unit goes{' '}
                      <i>down</i> instead.
                    </p>
                  </td>
                </tr>
              </Table>
            </Card>
            <Card id="orders-morale" title="Troop Quality and Morale">
              <Table headings={[{ text: 'Quality' }, { text: 'Morale', className: styles.center }]}>
                <tr>
                  <td className={styles.stretch}>Inexperienced</td>
                  <td className={styles.center}>8</td>
                </tr>
                <tr>
                  <td className={styles.stretch}>Regular</td>
                  <td className={styles.center}>9</td>
                </tr>
                <tr>
                  <td className={styles.stretch}>Veteran</td>
                  <td className={styles.center}>10</td>
                </tr>
              </Table>
            </Card>
            <Card id="orders-officers" title="Officer Bonuses">
              <Table
                headings={[
                  { text: 'Rank' },
                  { text: 'Morale' },
                  { text: 'Orders' },
                  { text: 'Range' }
                ]}
              >
                <tr>
                  <td className={styles.stretch}>Second Lieutenant</td>
                  <td className={styles.center}>+1</td>
                  <td className={styles.center}>1</td>
                  <td className={styles.center}>6"</td>
                </tr>
                <tr>
                  <td className={styles.stretch}>First Lieutenant</td>
                  <td className={styles.center}>+2</td>
                  <td className={styles.center}>2</td>
                  <td className={styles.center}>6"</td>
                </tr>
                <tr>
                  <td className={styles.stretch}>Captain</td>
                  <td className={styles.center}>+3</td>
                  <td className={styles.center}>3</td>
                  <td className={styles.center}>12"</td>
                </tr>
                <tr>
                  <td className={styles.stretch}>Major</td>
                  <td className={styles.center}>+4</td>
                  <td className={styles.center}>4</td>
                  <td className={styles.center}>12"</td>
                </tr>
              </Table>
            </Card>
          </Section>
          <Section id="movement" title="Rules" description="Movement">
            <Table headings={[{ text: 'Type' }, { text: 'Advance' }, { text: 'Run' }]}>
              <tr>
                <td className={styles.noWrap}>Infantry</td>
                <td className={styles.center}>6"</td>
                <td className={styles.center}>12"</td>
              </tr>
              <tr>
                <td className={styles.noWrap}>Tracked vehicle</td>
                <td className={styles.center}>9"</td>
                <td className={styles.center}>18"</td>
              </tr>
              <tr>
                <td className={styles.noWrap}>Half-tracked vehicle</td>
                <td className={styles.center}>9"</td>
                <td className={styles.center}>18"</td>
              </tr>
              <tr>
                <td className={styles.noWrap}>Wheeled vehicle</td>
                <td className={styles.center}>12"</td>
                <td className={styles.center}>24"</td>
              </tr>
            </Table>
            <Card id="movement-terrain" title="Terrain">
              <Table
                headings={[
                  { text: 'Type' },
                  { text: 'Infantry' },
                  { text: 'Artillery' },
                  { text: 'Wheeled Vehicles' },
                  { text: 'Tracked Vehicles' }
                ]}
              >
                <tr>
                  <td>Open Ground</td>
                  <td>OK</td>
                  <td>OK</td>
                  <td>OK</td>
                  <td>OK</td>
                </tr>
                <tr>
                  <td>Rough Ground</td>
                  <td>No Run</td>
                  <td>No*</td>
                  <td>No</td>
                  <td>No Run</td>
                </tr>
                <tr>
                  <td>Obstacle</td>
                  <td>No Run</td>
                  <td>No</td>
                  <td>No</td>
                  <td>OK*</td>
                </tr>
                <tr>
                  <td>Building</td>
                  <td>OK</td>
                  <td>No*</td>
                  <td>No</td>
                  <td>No (!)</td>
                </tr>
                <tr>
                  <td>Road</td>
                  <td>OK</td>
                  <td>OK</td>
                  <td>x2</td>
                  <td>x2</td>
                </tr>
              </Table>
              <ul className={styles.keys}>
                <li>
                  <strong>OK</strong> - The unit can move through the terrain without hindrance -
                  this is the default or normal rate for all kinds of troops over open ground.
                </li>
                <li>
                  <strong>OK*</strong> - The unit can cross this kind of terrain without hindrance
                  unless it has been designated as an anti-tank obstacle, or impassable bocage, or
                  the equivalent, in which case it is impassable to all types of vehicle.
                </li>
                <li>
                  <strong>No Run</strong> - The unit cannot cross or move within this kind of
                  terrain if undertaking a run action, but can cross or move over with an advance
                  action.
                </li>
                <li>
                  <strong>No</strong> - The unit cannot enter or move within this kind of terrain at
                  all.
                </li>
                <li>
                  <strong>No*</strong> - The unit cannot enter or move within this kind of terrain,
                  except that it can be deployed within the terrain at the start of the game. In
                  this case it cannot move once deployed. This represents situations where guns are
                  'dug in' to positions prior to the battle as discussed in the section on
                  Artillery.
                </li>
                <li>
                  <strong>No (!)</strong> - The unit cannot enter or move within this kind of
                  terrain, except that heavy and super-heavy tanks may move through and demolish
                  some buildings in some situations.
                </li>
                <li>
                  <strong>x2</strong> - The unit's move rate is doubled if it moves entirely along a
                  road or track. This enables vehicles to move rapidly along roads where the
                  opportunity permits.
                </li>
              </ul>
            </Card>
            <Card id="movement-vehicles" title="Vehicle Manoeuvre">
              <Table
                headings={[
                  { text: 'Type' },
                  { text: 'Advance' },
                  { text: 'Pivot (90˚)' },
                  { text: 'Run' },
                  { text: 'Pivot (90˚)' }
                ]}
              >
                <tr>
                  <td>Tracked</td>
                  <td>9"</td>
                  <td>2</td>
                  <td>18"</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>Half-track</td>
                  <td>9"</td>
                  <td>2</td>
                  <td>18"</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Wheeled</td>
                  <td>12"</td>
                  <td>2</td>
                  <td>24"</td>
                  <td>1</td>
                </tr>
              </Table>
            </Card>
            <Card id="movement-reverse" title="Reverse Moves">
              <p>
                A vehicle can reverse straight backwards at up to half its standard <i>advance</i>{' '}
                rate unless it is a <strong>recce</strong> vehicle. A recce vehicle can reverse at
                its full <i>advance</i> rate and can manoeuvre as if driving forward.
              </p>
            </Card>
          </Section>
          <Section id="shooting" title="Rules" description="Shooting">
            <ol className={styles.list}>
              <li>Declare target</li>
              <li>Target reacts</li>
              <li>Measure range</li>
              <li>Roll to hit</li>
              <li>Roll to damage</li>
              <li>Target takes casualties</li>
              <li>Target checks morale</li>
            </ol>
            <Card id="hit-modifiers" title="Hit Modifiers">
              <p>
                The basic chance of hitting a target is a roll of 3+.
                <br />
                The following modifiers apply.
              </p>
              <Hit hits={data.hit} />
            </Card>
            <Card id="damage-value" title="Damage Value">
              <p>Once a target is hit the minimum score indicated is required to score damage.</p>
              <Damage damage={data.damage} />
            </Card>
            <Card id="weapons" title="Weapons">
              <Weapons weapons={data.weapons} />
            </Card>
            <Card id="he-shots" title="HE Shots">
              <Table
                headings={[
                  { text: 'Diameter' },
                  { text: 'Pen' },
                  { text: 'Pin' },
                  { text: 'Hits vs targets in buildings' }
                ]}
              >
                <tr>
                  <td>1"</td>
                  <td>+1</td>
                  <td>D2</td>
                  <td>D3</td>
                </tr>
                <tr>
                  <td>2"</td>
                  <td>+2</td>
                  <td>D3</td>
                  <td>D6</td>
                </tr>
                <tr>
                  <td>3"</td>
                  <td>+3</td>
                  <td>D3</td>
                  <td>2D6</td>
                </tr>
                <tr>
                  <td>4"</td>
                  <td>+4</td>
                  <td>D6</td>
                  <td>3D6</td>
                </tr>
              </Table>
            </Card>
            <Card id="shooting-vehicles" title="Shooting At Vehicles">
              <p>Additional penetration modifier for Heavy Weapons against Armoured Targets</p>
              <Table headings={[{ text: 'Type' }, { text: 'Modifier' }]}>
                <tr>
                  <td>Side or top armour</td>
                  <td>+1</td>
                </tr>
                <tr>
                  <td>Rear armour</td>
                  <td>+2</td>
                </tr>
                <tr>
                  <td>Long range</td>
                  <td>-1</td>
                </tr>
              </Table>
              <ul className={styles.list}>
                <li>
                  <strong>Superficial damage</strong> - Against armoured vehicles only, if the die
                  roll to damage has scored <strong>the exact minimum</strong> needed after all
                  modifiers are taken into account, then the shot only cause superficial damage.
                  <br />
                  In this case deduct -3 from the damage result dice roll before consulting the
                  table.
                </li>
                <li>
                  <strong>Massive damage</strong> - If a weapon beats the damage value of the target
                  by a total of <strong>3 or greater</strong> than the minimum score required, then
                  the player rolls twice on the damage results chart.
                  <br />
                  Roll once and apply the result, then roll again and apply the second result.
                </li>
                <li>
                  <strong>Turret jam</strong> - When you inflict a damage result against a vehicle
                  with a turret and the vehicle is not destroyed, you take a turret jam test - roll
                  a D6.
                  <br />
                  On a 1-3, nothing happens.
                  <br />
                  On a 4-6, the turret is jammed and for the rest of the game the turret is limited
                  in the arc that the damage-causing hit came from.
                </li>
              </ul>
            </Card>
            <Card id="vehicle-damage-results" title="Damage Results on Vehicles">
              <Table headings={[{ text: 'D6' }, { text: 'Effect' }]}>
                <tr>
                  <td className={styles.center}>1</td>
                  <td className={styles.stretch}>
                    <strong>Crew Stunned</strong>
                    <br />
                    <p>
                      Add one additional pin marker to the vehicle. Place a <i>down</i> order die on
                      the vehicle or change its current order die to down to show that it is halted
                      and cannot take a further action that turn.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={styles.center}>2</td>
                  <td className={styles.stretch}>
                    <strong>Immobilised</strong>
                    <br />
                    <p>
                      Add one additional pin marker to the vehicle. The vehicle cannot move for the
                      rest of the game. Place a suitable marker or token by the vehicle to show
                      this. If the vehicle has already taken an action this turn flip the order die
                      to <i>down</i>
                      to indicate it has been brought to a halt. If a further immobilised result is
                      suffered the crew abandon the vehicle and it is considered knocked out (see
                      below).
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={styles.center}>3</td>
                  <td className={styles.stretch}>
                    <strong>On Fire</strong>
                    <br />
                    <p>
                      Add one additional pin marker and then make a morale check for the vehicle. If
                      the test is passed the fire has been put out or fizzles out of its own accord.
                      Place a down order die on the vehicle or change its current order die to{' '}
                      <i>down</i> to show that it is halted and cannot take a further action that
                      turn. If the test is failed, the crew abandon the vehicle and it is considered
                      knocked out (see below).
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={styles.center}>4+</td>
                  <td className={styles.stretch}>
                    <strong>Knocked Out</strong>
                    <br />
                    <p>
                      Mark the vehicle in some fashion to indicate it is wrecked - a blackened
                      cotton ball and/or an upside-down turret work quite well. Some players like to
                      use models of wrecked vehicles instead. Either way, wrecks of armoured
                      vehicles count as impassable terrain. If players prefer not to bother with
                      wrecks, destroyed vehicles can be removed altogether, perhaps blown apart by
                      an internal explosion leaving only scattered debris.
                    </p>
                  </td>
                </tr>
              </Table>
              <ul className={styles.keys}>
                <li>
                  <strong>Superficial Damage</strong> (damage roll matches required value) - D6-3
                </li>
                <li>
                  <strong>Full Damage</strong> (damage roll beats required value by 1 or 2) - D6
                </li>
                <li>
                  <strong>Massive Damage</strong> (damage roll beats required value by 3 or more) -
                  2D6
                </li>
                <li>
                  <strong>Open-topped hit by indirect fire</strong> - Add +1.
                </li>
              </ul>
            </Card>
          </Section>
          <Section id="close-quarters" title="Rules" description="Close Quarters">
            <ol className={styles.list}>
              <li>Declare target</li>
              <li>Measure move distance</li>
              <li>Target reacts</li>
              <li>Move assaulting models</li>
              <li>
                First round of close quarters
                <ol>
                  <li>Attackers roll to damage</li>
                  <li>Defenders take casualties</li>
                  <li>Defenders roll to damage</li>
                  <li>Attackers take casualties</li>
                  <li>Loser surrenders and is destroyed</li>
                </ol>
              </li>
              <li>Resolve draws - further rounds of close quarters</li>
              <li>Winner regroups</li>
            </ol>
          </Section>
          <Section id="buildings" title="Rules" description="Buildings">
            <Table
              headings={[
                { text: 'Type' },
                { text: 'Line of Sight' },
                { text: 'To Hit Modifier' },
                { text: 'Extra Protection' },
                { text: 'Special' }
              ]}
            >
              <tr>
                <td className={styles.noWrap}>Small Arms</td>
                <td>Opening</td>
                <td className={styles.center}>-2</td>
                <td className={styles.center}>Yes</td>
                <td className={styles.noWrap}>-</td>
              </tr>
              <tr>
                <td className={styles.noWrap}>Heavy Weapons</td>
                <td>Wall</td>
                <td className={styles.center}>-2</td>
                <td className={styles.center}>Yes</td>
                <td className={styles.noWrap}>-</td>
              </tr>
              <tr>
                <td className={styles.noWrap}>HE Weapons</td>
                <td>Wall</td>
                <td className={styles.center}>-</td>
                <td className={styles.center}>No</td>
                <td className={styles.noWrap}>10+ hits = Collapse!</td>
              </tr>
              <tr>
                <td className={styles.noWrap}>Flamethrowers</td>
                <td>Opening</td>
                <td className={styles.center}>-</td>
                <td className={styles.center}>No</td>
                <td className={styles.noWrap}>4+ hits = On Fire!</td>
              </tr>
              <tr>
                <td className={styles.noWrap}>Close Quarters</td>
                <td>Opening</td>
                <td className={styles.center}>-</td>
                <td className={styles.center}>No</td>
                <td className={styles.noWrap}>Defensive Position</td>
              </tr>
            </Table>
            <i className={styles.notes}>
              Bunkers have several exceptions to these rules (see rulebook)
            </i>
          </Section>
        </Stack>
      )}
    </Layout>
  );
};

export default QuickReferenceRules;
