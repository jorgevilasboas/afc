import { Match } from '.'

let match

beforeEach(async () => {
  match = await Match.create({ team1_id: 'test', team2_id: 'test', team1_score: 'test', team2_score: 'test', group: 'test', user_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = match.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(match.id)
    expect(view.team1_id).toBe(match.team1_id)
    expect(view.team2_id).toBe(match.team2_id)
    expect(view.team1_score).toBe(match.team1_score)
    expect(view.team2_score).toBe(match.team2_score)
    expect(view.group).toBe(match.group)
    expect(view.user_id).toBe(match.user_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = match.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(match.id)
    expect(view.team1_id).toBe(match.team1_id)
    expect(view.team2_id).toBe(match.team2_id)
    expect(view.team1_score).toBe(match.team1_score)
    expect(view.team2_score).toBe(match.team2_score)
    expect(view.group).toBe(match.group)
    expect(view.user_id).toBe(match.user_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
