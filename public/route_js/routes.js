var isGithub = window.location.hostname.indexOf('github.io') !== -1;
      var pathSegmentsToKeep = isGithub ? 1 : 0;

      var l = window.location;
      
      // Evita bucles infinitos si ya se procesó el redireccionamiento
      if (l.search.indexOf('?/') === -1) {
        l.replace(
          l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
          l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
          l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash
        );
      }