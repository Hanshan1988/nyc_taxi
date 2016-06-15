#==============================================================================
# # UTILS.PY
#==============================================================================

# Haversine distance function, utils.py
from math import radians, cos, sin, asin, atan, sqrt, pi

def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    return c * r

def manhattan(lon1, lat1, lon2, lat2):
    lon_dist = abs(lon2 - lon1)
    lat_dist = abs(lat2 - lat1)
    return 111 * (lon_dist + lat_dist)

def angle_abs(lon1, lat1, lon2, lat2):
    lon_dist = abs(lon2 - lon1)
    lat_dist = abs(lat2 - lat1)
    try:     
        angle_radians = atan(lat_dist/lon_dist)
        angle_degrees = 180 * (angle_radians / pi)
    except:
        angle_degrees = 0
    if lon2 > lon1:
        if lat2 > lat1:
            return angle_degrees
        elif lat2 < lat1:
            return 360 - angle_degrees
        else:
            return 0
    elif lon2 < lon1:
        if lat2 > lat1:
            return 180 - angle_degrees
        elif lat2 < lat1:
            return 180 + angle_degrees
        else:  
            return 180
    else:
        if lat2 > lat1:
            return 90
        elif lat2 < lat1:
            return 270
        else:  
            return 0

# Use list(flatten(l)) to get a new list
def flatten(l):
    # Flatten any list
    import collections
    for el in l:
        if isinstance(el, collections.Iterable) and not isinstance(el, basestring):
            for sub in flatten(el):
                yield sub
        else:
            yield el