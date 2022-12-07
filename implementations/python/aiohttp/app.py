import sys
sys.path.append(sys.path[0] + '\\..\\..\\..')

from aiohttp import web

routes = web.RouteTableDef()


@routes.post(r'/years/{year:\d{4}}/days/{day:\d{1,2}}/parts/{part:\d}')
async def solve(request: web.Request):
    body = await request.json()
    year, day, part = request.match_info['year'], request.match_info['day'], request.match_info['part']
    try:
        import implementations.python.core.years.y2022.day_1.part_1 as part1
        mod = __import__(f'implementations.python.core.years.y{year}.day_{day}.part_{part}', fromlist=['execute'])
        return web.json_response({'result': mod.execute(body.get('input'))})
    except (ModuleNotFoundError, AttributeError):
        raise web.HTTPNotImplemented()
    except Exception as e:
        raise web.HTTPServerError()


app = web.Application()
app.add_routes(routes)

web.run_app(app, port=3000)
