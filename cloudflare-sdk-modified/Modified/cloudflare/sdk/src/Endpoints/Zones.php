<?php
/**
 * Created by PhpStorm.
 * User: junade
 * Date: 06/06/2017
 * Time: 15:45
 */

namespace Cloudflare\API\Endpoints;

use Cloudflare\API\Adapter\Adapter;

class Zones implements API
{
    private $adapter;

    public function __construct(Adapter $adapter)
    {
        $this->adapter = $adapter;
    }

    /**
     * @SuppressWarnings(PHPMD.BooleanArgumentFlag)
     *
     * @param string $name
     * @param bool $jumpstart
     * @param string $organizationID
     * @return \stdClass
     */
    public function addZone(string $name, bool $jumpstart = false, string $organizationID = ''): \stdClass
    {
        $options = [
            'name' => $name,
            'jumpstart' => $jumpstart
        ];

        if (!empty($organizationID)) {
            $organization = new \stdClass();
            $organization->id = $organizationID;
            $options["organization"] = $organization;
        }

        $user = $this->adapter->post('zones', [], $options);
        $body = json_decode($user->getBody());
        return $body->result;
    }

    public function activationCheck(string $zoneID): bool
    {
        $user = $this->adapter->put('zones/' . $zoneID . '/activation_check', [], []);
        $body = json_decode($user->getBody());

        if (isset($body->result->id)) {
            return true;
        }

        return false;
    }

    public function listZones(
        string $name = "",
        string $status = "",
        int $page = 1,
        int $perPage = 50,
        string $order = "",
        string $direction = "",
        string $match = "all"
    ): \stdClass {
        $query = [
            'page' => $page,
            'per_page' => $perPage,
            'match' => $match
        ];

        if (!empty($name)) {
            $query['name'] = $name;
        }

        if (!empty($status)) {
            $query['status'] = $status;
        }

        if (!empty($order)) {
            $query['order'] = $order;
        }

        if (!empty($direction)) {
            $query['direction'] = $direction;
        }

        $user = $this->adapter->get('zones', $query, []);
        $body = json_decode($user->getBody());

        $result = new \stdClass();
        $result->result = $body->result;
        $result->result_info = $body->result_info;

        return $result;
    }

    public function getZoneID(string $name = ""): string
    {
        $zones = $this->listZones($name);

        if (sizeof($zones->result) < 1) {
            throw new EndpointException("Could not find zones with specified name.");
        }

        return $zones->result[0]->id;
    }

    /**
     * Purge Everything
     * @param string $zoneID
     * @return bool
     */
    public function cachePurgeEverything(string $zoneID): bool
    {
        $user = $this->adapter->delete('zones/' . $zoneID . '/purge_cache', [], ["purge_everything" => true]);

        $body = json_decode($user->getBody());

        if (isset($body->result->id)) {
            return true;
        }

        return false;
    }

    public function cachePurge(string $zoneID, array $files = null, array $tags = null): bool
    {
        if (is_null($files) && is_null($tags)) {
            throw new EndpointException("No files or tags to purge.");
        }

        $options = [
            'files' => $files
           
        ];


        // Only Enterprise zones are allowed to purge tags. Cloudflare is not
        // executing requests even for files of free zones if we pass tags.
        if(count($tags)>0)  
        {
            $options['tags']= $tags;
        }
        //var_dump($options);
        $user = $this->adapter->delete('zones/' . $zoneID . '/purge_cache', [], $options);
        
        $body = json_decode($user->getBody());
        
        if (isset($body->result->id)) {
            return true;
        }

        return false;
    }


     /**
     * Get Zone Settings
     * @param string $zoneID
     * @return stdClass
     */
    public function getZoneSettings(string $zoneID): array
    {
        $user = $this->adapter->get('zones/' . $zoneID . '/settings', [], []);

        $body = json_decode($user->getBody());

        
        
        return $body->result;

       
    }
    /**
     * Get Zone Details
     * @param string $zoneID
     * @return stdClass
     */
    public function getZoneDetails(string $zoneID): \stdClass
    {
        $user = $this->adapter->get('zones/' . $zoneID , [], []);

        $body = json_decode($user->getBody());

        
        
        return $body->result;

       
    }

    public function updateZoneSetting(
        string $zoneID,
        string $setting,
         $value
       
    ): \stdClass {
        $query = [
            'value' => $value,
           
        ];

        // var_dump($query);
        $user = $this->adapter->patch(
            'zones/' . $zoneID . '/settings/' . $setting,
            [],
            $query
        );
        $body = json_decode($user->getBody());

        return $body->result;
    }

    public function updateZone(
        string $zoneID,
        bool $paused
       
    ): \stdClass {
        $query = [
            'paused' => $paused,
           
        ];

        // var_dump($query);
        $user = $this->adapter->patch(
            'zones/' . $zoneID,
            [],
            $query
        );
        $body = json_decode($user->getBody());

        return $body->result;
    }

    public function getZoneAnalytics(string $zoneID, string $since): \stdClass
    {   

        $query = [
            'since' => $since,
            'until' => 0,
            'continuous' => false,
            
        ];
        $user = $this->adapter->get('zones/' . $zoneID . '/analytics/dashboard', $query, []);

        $body = json_decode($user->getBody());

        
        
        return $body->result;

       
    }

    public function getDnsAnalytics(string $zoneID, string $since, string $until,$dimensions): \stdClass
    {   

        $query = [
            'dimensions'=>$dimensions,

            'metrics' => "queryCount,uncachedCount,staleCount,responseTimeAvg,responseTimeMedian,responseTime90th,responseTime99th",
            'since' => $since,
            'until' => $until,
            'time_delta' => 'minute'

            
        ];

        $metrics = [
            "queryCount",
            "responseTimeAvg"
            
        ];


        $user = $this->adapter->get('zones/' . $zoneID . '/dns_analytics/report/bytime', $query, []);

        $body = json_decode($user->getBody());

        
        
        return $body->result;

       
    }


    public function getZoneAccessRules(string $zoneID): array
    {   

        $query = [
            'scope_type' => 'zone',
            'per_page'  => '100'
           
            
        ];
        $user = $this->adapter->get('zones/' . $zoneID . '/firewall/access_rules/rules', $query, []);

        $body = json_decode($user->getBody());

        
        
        return $body->result;

       
    }

    public function updateZoneAccessRule(
        string $zoneID,
        string $ruleID,
        string $mode,
        string $notes
    ): \stdClass {
        $query = [
            'mode' => $mode,
            'notes' => $notes
        ];

        $user = $this->adapter->patch(
            'zones/' . $zoneID . '/firewall/access_rules/rules/' . $ruleID,
            [],
            $query
        );
        $body = json_decode($user->getBody());

        return $body->result;
    }




    public function addZoneAccessRule(
        string $zoneID,
        string $target,
        string $value,
        string $mode,
        string $notes
    ): \stdClass {
        $query = [
            'mode' => $mode,
            'notes' => $notes,
            'configuration' =>  (object) [
                    'value' => $value,
                    'target' => $target,
                  ]
        ];

        $user = $this->adapter->post(
            'zones/' . $zoneID . '/firewall/access_rules/rules/',
            [],
            $query
        );
        $body = json_decode($user->getBody());

        return $body->result;
    }



    public function deleteZoneAccessRule(string $zoneID, string $ruleID): bool
    {
        $user = $this->adapter->delete('zones/' . $zoneID . '/firewall/access_rules/rules/' . $ruleID, [], []);

        $body = json_decode($user->getBody());

        if (isset($body->result->id)) {
            return true;
        }

        return false;
    }

   public function deleteZoneCustomCertificate(string $zoneID, string $certID): bool
    {
        $user = $this->adapter->delete('zones/' . $zoneID . '/custom_certificates/' . $certID, [], []);

        $body = json_decode($user->getBody());

        if (isset($body->result->id)) {
            return true;
        }

        return false;
    }
    public function getZoneCustomCertificates(string $zoneID): array
    {   

        $query = [
            'scope_type' => 'zone',
            'per_page'  => '100'
           
            
        ];
        $user = $this->adapter->get('zones/' . $zoneID . '/custom_certificates', $query, []);

        $body = json_decode($user->getBody());

        
        
        return $body->result;

       
    }

    public function addZoneCustomCertificate(
        string $zoneID,
        string $certificate,
        string $private_key
       
    ): \stdClass {
        $query = [
            'certificate' => $certificate,
            'private_key' => $private_key
        ];

        $user = $this->adapter->post('zones/' . $zoneID . '/custom_certificates',
            [],
            $query
        );
        $body = json_decode($user->getBody());

        return $body->result;
    }


}
