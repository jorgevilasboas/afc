import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Match, { schema } from './model'

const router = new Router()
const { team1_id, team2_id, team1_score, team2_score, group, user_id } = schema.tree

/**
 * @api {post} /matches Create match
 * @apiName CreateMatch
 * @apiGroup Match
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam team1_id Match's team1_id.
 * @apiParam team2_id Match's team2_id.
 * @apiParam team1_score Match's team1_score.
 * @apiParam team2_score Match's team2_score.
 * @apiParam group Match's group.
 * @apiParam user_id Match's user_id.
 * @apiSuccess {Object} match Match's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Match not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ team1_id, team2_id, team1_score, team2_score, group, user_id }),
  create)

/**
 * @api {get} /matches Retrieve matches
 * @apiName RetrieveMatches
 * @apiGroup Match
 * @apiUse listParams
 * @apiSuccess {Object[]} matches List of matches.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /matches/:id Retrieve match
 * @apiName RetrieveMatch
 * @apiGroup Match
 * @apiSuccess {Object} match Match's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Match not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /matches/:id Update match
 * @apiName UpdateMatch
 * @apiGroup Match
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam team1_id Match's team1_id.
 * @apiParam team2_id Match's team2_id.
 * @apiParam team1_score Match's team1_score.
 * @apiParam team2_score Match's team2_score.
 * @apiParam group Match's group.
 * @apiParam user_id Match's user_id.
 * @apiSuccess {Object} match Match's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Match not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ team1_id, team2_id, team1_score, team2_score, group, user_id }),
  update)

/**
 * @api {delete} /matches/:id Delete match
 * @apiName DeleteMatch
 * @apiGroup Match
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Match not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
