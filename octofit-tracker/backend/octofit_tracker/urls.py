import os
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter
from octofit_tracker.views import (
    api_root,
    UserViewSet,
    TeamViewSet,
    ActivityViewSet,
    LeaderboardViewSet,
    WorkoutViewSet,
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')
router.register(r'workouts', WorkoutViewSet, basename='workout')

# Base URL is resolved at start-up from settings so that absolute reverse()
# calls and browsable-API links point to the correct Codespace HTTPS endpoint.
# USE_X_FORWARDED_HOST + SECURE_PROXY_SSL_HEADER (set in settings.py) ensure
# that request.build_absolute_uri() returns the right value at request time.
base_url = settings.CODESPACE_BASE_URL

# REST API endpoints:
#   {base_url}/api/users/
#   {base_url}/api/teams/
#   {base_url}/api/activities/
#   {base_url}/api/leaderboard/
#   {base_url}/api/workouts/

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
    path('', RedirectView.as_view(url='/api/', permanent=False)),
]
